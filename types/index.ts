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
    dueDate: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string(),
});

export const HealthMetricSchema = z.object({
  metricType: z.enum(["WEIGHT", "BLOODPRESSURE"]),
  value: z.string(),
});

export const ResourceUploadSchema = z.object({
  title: z.string().min(3).max(255),
  author: z.string().min(1).max(255).optional(),
  description: z.string().min(10),
  doc: z.custom<File[]>().refine((files) => {
    return files.length > 0;
  }, "Please Upload a Resume"),
});
