import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email format"),

  phone: z
    .string({ message: "Phone is required" })
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone must contain only numbers"),

  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;