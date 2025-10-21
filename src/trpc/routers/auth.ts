import { APIError } from "better-auth";
import { headers as getHeaders } from "next/headers";

import { TRPCError } from "@trpc/server";

import { auth } from "@/lib/auth";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/trpc/init";

import {
  signInSchema,
  signUpSchema,
  verifyOtpSchema,
} from "@/features/auth/schemas";

export const authRoute = createTRPCRouter({
  signIn: publicProcedure.input(signInSchema).mutation(async ({ input }) => {
    try {
      const res = await auth.api.signInEmail({
        headers: await getHeaders(),
        body: {
          email: input.email,
          password: input.password,
        },
      });

      if (!res.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credential or missing token",
        });
      }

      return res.user;
    } catch (error) {
      console.log({ error });
      if (error instanceof APIError) {
        if (error.body?.code === "INVALID_EMAIL_OR_PASSWORD") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: error.body.message,
          });
        }
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to sign in user",
        cause: error,
      });
    }
  }),

  signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    try {
      const res = await auth.api.signUpEmail({
        headers: await getHeaders(),
        body: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });

      return res.user;
    } catch (error) {
      if (error instanceof APIError) {
        if (error.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
          throw new TRPCError({
            code: "CONFLICT",
            message: error.body.message,
          });
        }
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to sign up user",
        cause: error,
      });
    }
  }),

  signOut: protectedProcedure.mutation(async () => {
    try {
      await auth.api.signOut({
        headers: await getHeaders(),
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to sign out user",
        cause: error,
      });
    }
  }),

  verifyOtp: publicProcedure
    .input(verifyOtpSchema)
    .mutation(async ({ input }) => {
      try {
        const { user } = await auth.api.verifyEmailOTP({
          headers: await getHeaders(),
          body: {
            email: input.email,
            otp: input.otpCode,
          },
        });

        return user.name as string;
      } catch (error) {
        console.log({ error });
        if (error instanceof APIError) {
          if (error.body?.code === "OTP_EXPIRED") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Your verification code has expired.",
            });
          }

          if (error.body?.code === "INVALID_OTP") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "The verification code you entered is invalid.",
            });
          }
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to verify email",
          cause: error,
        });
      }
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You need sign in to continue",
      });

    return ctx.session?.user;
  }),
});
