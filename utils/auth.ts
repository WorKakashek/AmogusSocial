import { prisma } from "@/utils/connect";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// const prisma = new PrismaClient();
export const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
};
const handler = NextAuth(options);

export const getAuthSession = () => getServerSession(options);
