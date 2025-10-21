import { headers as getHeaders } from "next/headers";

import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/trpc/init";

import { signInSchema, signUpSchema } from "@/features/auth/schemas";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth";

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
      await auth.api.signUpEmail({
        headers: await getHeaders(),
        body: {
          name: input.name,
          email: input.email,
          password: input.password,
        },
      });
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
});
