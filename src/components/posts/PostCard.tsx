import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    type: string;
    createdAt: Date;
    tags: string | null;
    externalUrl: string | null;
    user: { name: string | null; image: string | null };
    category: { name: string; slug: string } | null;
    _count: { comments: number; likes: number };
  };
}

export function PostCard({ post }: PostCardProps) {
  const typeLabels: Record<string, { label: string; color: string }> = {
    POST: { label: "討論", color: "bg-blue-100 text-blue-700" },
    JOB: { label: "招人", color: "bg-green-100 text-green-700" },
    PROMOTION: { label: "優惠", color: "bg-amber-100 text-amber-700" },
  };

  const typeInfo = typeLabels[post.type] || typeLabels.POST;
  const dateStr = new Date(post.createdAt).toLocaleDateString("zh-TW", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={"/posts/" + post.id}
      className="block p-4 border border-border rounded-lg bg-white hover:border-primary/30 hover:shadow-sm transition-all no-underline"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={"inline-block px-2 py-0.5 rounded text-xs font-medium " + typeInfo.color}>
          {typeInfo.label}
        </span>
        {post.category && (
          <span className="text-xs text-muted">{post.category.name}</span>
        )}
        <span className="text-xs text-muted ml-auto">{dateStr}</span>
      </div>

      <h3 className="font-medium text-foreground mb-1.5 line-clamp-2">
        {post.title}
      </h3>

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-muted">
          {post.user.name || "匿名"}
        </span>
        <div className="flex items-center gap-3 text-xs text-muted">
          {post._count.comments > 0 && <span>{post._count.comments} 回應</span>}
          {post._count.likes > 0 && <span>{post._count.likes} 讚</span>}
        </div>
      </div>
    </Link>
  );
}