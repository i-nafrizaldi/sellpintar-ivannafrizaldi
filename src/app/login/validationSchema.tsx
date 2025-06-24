import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

export const ValidationSchema = z.object({
  username: z.string({
    required_error: "Username is Required",
  }),
  password: z
    .string({
      required_error: "Password is Required",
    })
    .min(2, {
      message: "Password must be at least 2 characters.",
    })
    .refine((value) => passwordRegex.test(value), {
      message:
        "Password must contain at least one uppercase letter and one special character.",
    }),
});
