import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

import { db } from "@/drizzle/db";
import * as schema from "@/drizzle/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
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
