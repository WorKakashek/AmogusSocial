import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/route";

// get all comments
export const GET = async (req: any) => {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(comments));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
//create comment
export const POST = async (req: any) => {
  const { searchParams } = new URL(req.url);
  const session = await getAuthSession();
  const postSlug = searchParams.get("postSlug");

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authentificated" }));
  }

  try {
    const body = await req.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user?.email },
    });
    console.log(body);
    return new NextResponse(JSON.stringify(comment));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
