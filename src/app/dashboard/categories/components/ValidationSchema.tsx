import { z } from "zod";

export const ValidationSchema = z.object({
  name: z.string({
    required_error: "Category is Required",
  }),
});
