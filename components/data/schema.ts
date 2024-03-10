import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dueDate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.enum(["USER", "ADMIN"]),
});

// id: string;
// email: string;
// password: string;
// firstName: string;
// lastName: string;
// dueDate: Date | null;
// createdAt: Date;
// updatedAt: Date;
// role: $Enums.Role;

export type User = z.infer<typeof userSchema>;
