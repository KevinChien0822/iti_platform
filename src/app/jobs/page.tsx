import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">招人資訊</h1>
        <p className="text-sm text-muted mt-1">校友專屬的職缺與招募資訊</p>
      </div>

      <div className="bg-white border border-border rounded-lg p-8 text-center">
        <Briefcase className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-lg font-semibold text-foreground mb-2">查看最新招人貼文</h2>
        <p className="text-sm text-muted mb-6">
          招人資訊會以貼文形式發布在討論區，你可以直接查看或發布新的招募資訊。
        </p>
        <Link
          href="/posts?type=job"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm no-underline hover:bg-primary-dark transition-colors"
        >
          查看招人貼文
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
