import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const where: any = { status: "PUBLISHED" };
  if (type) where.type = type.toUpperCase();

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      user: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
      _count: { select: { comments: true, likes: true } },
    },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "請先登入" }, { status: 401 });
  }

  try {
    const { title, content, type, externalUrl } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "標題和內容為必填" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        type: type || "POST",
        externalUrl: externalUrl || null,
        userId: session.user.id,
        status: "PUBLISHED",
      },
      include: {
        user: { select: { name: true } },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "發布失敗，請稍後再試" },
      { status: 500 }
    );
  }
}
