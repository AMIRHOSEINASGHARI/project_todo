import { z } from "zod";

export const editProfileFormSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be between 4 and 10 characters")
    .max(10, "َUsername must be between 4 and 10 characters"),
  name: z
    .string()
    .min(8, "Name must be between 8 and 15 characters")
    .max(15, "Name must be between 8 and 15 characters"),
  avatar: z.string().url("Must be a valid image URL!").optional(),
});
