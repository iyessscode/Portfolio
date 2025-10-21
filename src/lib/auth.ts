import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP } from "better-auth/plugins";

import { env } from "@/data/env";
import { db } from "@/drizzle/db";
import * as schema from "@/drizzle/schema";
import OTPEmail from "@/features/auth/email/otp-email";
import { resend } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: "user",
    }),
    emailOTP({
      allowedAttempts: 5,
      expiresIn: 60 * 5,
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, type, otp }) {
        await resend.emails.send({
          from: env.RESEND_SENDER_EMAIL,
          to: email,
          subject: getSubjectText(type),
          react: OTPEmail({
            otpCode: otp,
            purpose: type,
            expiryMinutes: "5",
          }),
        });
      },
    }),
  ],
});
export type SubjectType = "sign-in" | "email-verification" | "forget-password";

export const getSubjectText = (type: SubjectType) => {
  switch (type) {
    case "sign-in":
      return "Sign-in Verification Code";
    case "email-verification":
      return "Email Verification Code";
    default:
      return "Password Reset Code";
  }
};
