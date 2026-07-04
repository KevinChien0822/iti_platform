import Link from "next/link";
import { Tag, ArrowRight } from "lucide-react";

export default function PromotionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">優惠活動</h1>
        <p className="text-sm text-muted mt-1">校友專屬優惠與好康</p>
      </div>

      <div className="bg-white border border-border rounded-lg p-8 text-center">
        <Tag className="w-12 h-12 mx-auto mb-4 text-amber-500" />
        <h2 className="text-lg font-semibold text-foreground mb-2">查看最新優惠</h2>
        <p className="text-sm text-muted mb-6">
          優惠活動以貼文形式發布，你可以直接查看或分享好康。
        </p>
        <Link
          href="/posts?type=promotion"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm no-underline hover:bg-primary-dark transition-colors"
        >
          查看優惠貼文
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
