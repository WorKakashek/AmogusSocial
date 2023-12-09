import { prisma } from "@/utils/connect";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// const prisma = new PrismaClient();
const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
};
const handler = NextAuth(options);

const getAuthSession = () => getServerSession(options);

export { handler as GET, handler as POST, prisma, getAuthSession };
