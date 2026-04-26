import { z } from "zod";

// Allowed roles
export const userRoles = ["Headmaster", "teacher"] as const;

// UPDATE USER SCHEMA (PATCH)
export const updateUserSchema = z.object({
  email: z.string().email().optional(),

  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone too long")
    .optional(),

  firstName: z
    .string()
    .min(2, "First name too short")
    .optional(),

  lastName: z
    .string()
    .min(2, "Last name too short")
    .optional(),

  role: z.enum(userRoles).optional(),
  isVerified: z.boolean().optional(),
  id: z.string().optional(),
  createdAt: z.any().optional(),
  updatedAt: z.any().optional(),
})
.strict(); //  prevents unknown fields

// @/lib/validators/auth/user.validator.ts
// import { z } from "zod";

// export const userRoles = ["Headmaster", "teacher"] as const;

// export const updateUserSchema = z.object({
//   firstName: z.string().min(2).optional(),
//   lastName: z.string().min(2).optional(),
//   email: z.string().email().optional(),
//   phone: z.string().optional(),
//   role: z.enum(userRoles).optional(),
//   isVerified: z.boolean().optional(),
//   // Add these if you want to keep .strict() but allow the full object to pass
//   id: z.string().optional(),
//   createdAt: z.any().optional(),
//   updatedAt: z.any().optional(),
// }).strict();