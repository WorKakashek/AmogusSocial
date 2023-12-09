import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";
// get posts
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.log(err);
  }
};
//create post
export const POST = async (req: any) => {
  const session = await getAuthSession();
  if (!session) {
    console.log("залупа");
    return new NextResponse(JSON.stringify({ message: "Not auth" }));
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user?.email },
    });
    return new NextResponse(JSON.stringify(post));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
