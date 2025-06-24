import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const ValidationSchema = z.object({
  title: z.string({
    required_error: "Username is Required",
  }),
  categoryId: z.string({
    required_error: "Username is Required",
  }),
  content: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});
