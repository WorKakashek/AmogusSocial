import { options } from "@/utils/auth";
import NextAuth from "next-auth";

// const prisma = new PrismaClient();
const handler = NextAuth(options);

export { handler as GET, handler as POST };
