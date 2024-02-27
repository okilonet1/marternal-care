import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adapter = new PrismaAdapter(prisma.session, prisma.user);
export default prisma;
