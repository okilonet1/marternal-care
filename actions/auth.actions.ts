"use server";

import { SignInSchema, SignUpSchema } from "@/types";
import { z } from "zod";
import { Argon2id } from "oslo/password";

import prisma from "@/lib/prismadb";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const hashedPassword = await new Argon2id().hash(values.password);

  try {
    const user = await prisma.user.create({
      data: {
        email: values.email,
        password: hashedPassword,
        firstName: values.firstName,
        lastName: values.lastName,
        dueDate: new Date(values.dueDate).toISOString(),
      },
    });

    const session = await lucia.createSession(user.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      data: {
        session,
        user,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error?.message,
    };
  }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await new Argon2id().verify(
      user.password,
      values.password,
    );

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const session = await lucia.createSession(user.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      data: {
        session,
        user,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error?.message,
    };
  }
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      throw new Error("Not logged in");
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
