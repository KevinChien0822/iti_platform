import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield, Users, FileText, MessageSquare } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  const [userCount, postCount, commentCount] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.comment.count(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="w-6 h-6 text-purple-600" />
        <h1 className="text-2xl font-bold text-foreground">管理後台</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-foreground">用戶</h3>
          </div>
          <p className="text-2xl font-bold text-foreground">{userCount}</p>
          <p className="text-xs text-muted mt-1">註冊用戶總數</p>
        </div>

        <div className="bg-white border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-foreground">貼文</h3>
          </div>
          <p className="text-2xl font-bold text-foreground">{postCount}</p>
          <p className="text-xs text-muted mt-1">發布貼文總數</p>
        </div>

        <div className="bg-white border border-border rounded-lg p-5">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <h3 className="font-medium text-foreground">回應</h3>
          </div>
          <p className="text-2xl font-bold text-foreground">{commentCount}</p>
          <p className="text-xs text-muted mt-1">回應總數</p>
        </div>
      </div>

      <div className="bg-white border border-border rounded-lg p-6">
        <h2 className="font-semibold text-foreground mb-4">快速操作</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/posts"
            className="px-4 py-2 bg-gray-50 border border-border rounded-lg text-sm text-foreground hover:bg-gray-100 transition-colors no-underline"
          >
            管理貼文
          </Link>
          <span className="px-4 py-2 bg-gray-50 border border-border rounded-lg text-sm text-muted cursor-not-allowed">
            用戶管理 (開發中)
          </span>
          <span className="px-4 py-2 bg-gray-50 border border-border rounded-lg text-sm text-muted cursor-not-allowed">
            分類管理 (開發中)
          </span>
        </div>
      </div>
    </div>
  );
}
