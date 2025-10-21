import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Minimum 2 characters")
    .max(70, "Maximum 70 characters"),
  email: z.email(),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .max(70, "Maximum 70 characters"),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .max(70, "Maximum 70 characters"),
});
