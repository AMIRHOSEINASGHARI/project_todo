import { z } from "zod";

export const editProfileFormSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be between 4 and 10 characters")
    .max(10, "َUsername must be between 4 and 10 characters"),
  name: z
    .string()
    .min(4, "Name must be between 8 and 15 characters")
    .max(10, "Name must be between 8 and 15 characters"),
  currentPassword: z
    .string()
    .min(4, "Password must be between 4 and 10 characters")
    .max(10, "Password must be between 4 and 10 characters"),
  newPassword: z
    .string()
    .min(4, "Password must be between 4 and 10 characters")
    .max(10, "Password must be between 4 and 10 characters"),
  avatar: z
    .array(
      z.union([
        z.string().url("Must be a valid image URL!"),
        z.instanceof(File),
      ])
    )
    .min(1, "One images is required")
    .max(1, "Maximum number of images is one!"),
});
