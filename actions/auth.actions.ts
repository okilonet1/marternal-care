"use server";

import { SignUpSchema } from "@/types";
import { z } from "zod";
import { Argon2id } from "oslo/password";

import prisma from "@/lib/prismadb";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  console.log(values);

  const hashedPassword = await new Argon2id().hash(values.password);

  try {
    const user = await prisma.user.create({
      data: {
        email: values.email,
        password: hashedPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        dueDate: values.dueDate,
      },
    });

    const session = await lucia.createSession(user.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: {
        session,
        user,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
