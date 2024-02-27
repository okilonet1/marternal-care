import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: "Email must be a valid email address.",
    }),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(20, {
        message: "Password must be at most 20 characters.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least on Number.",
      }),
    confirmPassword: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dueDate: z.date({
      invalid_type_error: "Due date must be a valid date.",
      required_error: "Due date is required.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
