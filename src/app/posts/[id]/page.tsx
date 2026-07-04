import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ArrowLeft, ExternalLink, Clock, User } from "lucide-react";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true, role: true } },
      category: { select: { name: true } },
      _count: { select: { comments: true, likes: true } },
    },
  });

  if (!post) notFound();

  const isAlumni = post.user.role === "ALUMNI";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground no-underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回討論區
      </Link>

      <article className="bg-white border border-border rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className={"inline-block px-2.5 py-0.5 rounded text-xs font-medium " +
            (post.type === "JOB"
              ? "bg-green-100 text-green-700"
              : post.type === "PROMOTION"
              ? "bg-amber-100 text-amber-700"
              : "bg-blue-100 text-blue-700")}>
            {post.type === "JOB" ? "招人資訊" : post.type === "PROMOTION" ? "優惠活動" : "討論"}
          </span>
          {post.category && (
            <span className="text-xs text-muted">{post.category.name}</span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.user.name || "匿名校友"}
            {isAlumni && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">校友</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap mb-6">
          {post.content}
        </div>

        {post.externalUrl && (
          <a
            href={post.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-border rounded-lg text-sm text-primary hover:bg-gray-100 transition-colors no-underline"
          >
            <ExternalLink className="w-4 h-4" />
            檢視外部連結
          </a>
        )}

        {post.tags && (
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
            {post.tags.split(",").map((tag: string) => (
              <span key={tag.trim()} className="px-2 py-0.5 bg-gray-100 text-muted rounded text-xs">
                {"#" + tag.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border text-sm text-muted">
          <span>{post._count.comments} 則回應</span>
          <span>{post._count.likes} 個讚</span>
        </div>
      </article>
    </div>
  );
}