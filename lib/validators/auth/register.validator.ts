import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string({ message: "First name is required" })
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long"),

    lastName: z
      .string({ message: "Last name is required" })
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long"),

    email: z
      .string({ message: "Email is required" })
      .email("Invalid email format")
      .toLowerCase(), // Ensure email is always handled in lowercase

    phone: z
      .string({ message: "Phone is required" })
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^[0-9]+$/, "Phone must contain only numbers"),

    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters for better security")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  })
  .superRefine(({ password, firstName, lastName, phone, email }, ctx) => {
    const lowerPass = password.toLowerCase();
    const emailPrefix = email.split("@")[0].toLowerCase();

    // 1. Check if password contains First Name
    if (lowerPass.includes(firstName.toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password cannot contain your first name",
        path: ["password"],
      });
    }

    // 2. Check if password contains Last Name
    if (lowerPass.includes(lastName.toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password cannot contain your last name",
        path: ["password"],
      });
    }

    // 3. Check if password contains Phone Number
    if (lowerPass.includes(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password cannot contain your phone number",
        path: ["password"],
      });
    }

    // 4. Check if password contains Email Prefix
    if (emailPrefix.length > 3 && lowerPass.includes(emailPrefix)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password cannot contain your email name",
        path: ["password"],
      });
    }
  });

export type SignupInput = z.infer<typeof signupSchema>;