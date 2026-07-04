import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { PostCard } from "@/components/posts/PostCard";
import { Plus, MessageSquare } from "lucide-react";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;

  const where: Record<string, unknown> = { status: "PUBLISHED" };
  if (params.type) where.type = params.type.toUpperCase();

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
      _count: { select: { comments: true, likes: true } },
    },
  });

  const currentType = params.type || "all";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">討論區</h1>
          <p className="text-sm text-muted mt-1">校友交流、經驗分享</p>
        </div>
        {session?.user && (
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium no-underline hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            發布貼文
          </Link>
        )}
      </div>

      <div className="flex gap-2 mb-6 border-b border-border pb-3">
        {[
          { key: "all", label: "全部", href: "/posts" },
          { key: "post", label: "討論", href: "/posts?type=post" },
          { key: "job", label: "招人", href: "/posts?type=job" },
          { key: "promotion", label: "優惠", href: "/posts?type=promotion" },
        ].map((tab) => {
          const tabCls = "px-3 py-1.5 text-sm rounded-md no-underline transition-colors " +
            (currentType === tab.key ? "bg-primary text-white" : "text-muted hover:text-foreground hover:bg-gray-100");
          return (
            <Link key={tab.key} href={tab.href} className={tabCls}>
              {tab.label}
            </Link>
          );
        })}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">暫無貼文</p>
          <p className="text-sm mt-1">目前這個分類還沒有內容</p>
        </div>
      )}
    </div>
  );
}