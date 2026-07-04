import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Mail, Calendar, Briefcase, Shield, GraduationCap, BookOpen, Star } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: { select: { posts: true, comments: true } },
    },
  });

  if (!user) redirect("/login");

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">個人資料</h1>

      <div className="bg-white border border-border rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
            {user.name?.[0] || user.email[0] || "?"}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.name || "未設定姓名"}</h2>
            <p className="text-sm text-muted">{user.email}</p>
            {user.role === "ADMIN" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium mt-1">
                <Shield className="w-3 h-3" />
                管理員
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4 border-t border-border pt-4">
          <div className="flex items-center gap-3 text-sm">
            <User className="w-4 h-4 text-muted" />
            <span className="text-muted">角色：</span>
            <span>{user.role === "ALUMNI" ? "校友" : user.role === "ADMIN" ? "管理員" : "一般用戶"}</span>
          </div>

          {user.graduationYear && (
            <div className="flex items-center gap-3 text-sm">
              <GraduationCap className="w-4 h-4 text-muted" />
              <span className="text-muted">畢業年度：</span>
              <span>{user.graduationYear}</span>
            </div>
          )}

          {user.department && (
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="w-4 h-4 text-muted" />
              <span className="text-muted">班別 / 科系：</span>
              <span>{user.department}</span>
            </div>
          )}

          {user.referrer && (
            <div className="flex items-center gap-3 text-sm">
              <Star className="w-4 h-4 text-muted" />
              <span className="text-muted">推薦人：</span>
              <span>{user.referrer}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted" />
            <span className="text-muted">註冊時間：</span>
            <span>{new Date(user.createdAt).toLocaleDateString("zh-TW")}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Briefcase className="w-4 h-4 text-muted" />
            <span className="text-muted">發文數：</span>
            <span>{user._count.posts}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Link
            href="/posts"
            className="text-sm text-primary hover:underline no-underline"
          >
            查看我的貼文
          </Link>
        </div>
      </div>
    </div>
  );
}