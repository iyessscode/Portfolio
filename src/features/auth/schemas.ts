import z from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .max(70, "Maximum 70 characters"),
});
