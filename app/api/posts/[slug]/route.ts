//get single postimport { prisma } from "@/utils/connect";
import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

// get post
export const GET = async (reg: any, { params }: any) => {
  const { slug } = params;
  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
    });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
  }
};
