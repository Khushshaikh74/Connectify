import { z } from 'zod'

export const userSignUpSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .max(50, 'Full name must be under 50 characters')
    .regex(/^[A-Za-z\s]+$/, 'Full name should only contain letters and spaces'),

  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password is too long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
});
