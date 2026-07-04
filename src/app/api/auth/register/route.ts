import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, password, graduationYear, department, referrer } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email 和密碼為必填" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "此 Email 已被註冊" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        passwordHash,
        graduationYear: graduationYear ? parseInt(graduationYear) : null,
        department: department || null,
        referrer: referrer || null,
      },
    });

    return NextResponse.json(
      { id: user.id, email: user.email, name: user.name },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "註冊失敗，請稍後再試" },
      { status: 500 }
    );
  }
}