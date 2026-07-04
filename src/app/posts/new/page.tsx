"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Send, ArrowLeft } from "lucide-react";

const POST_TYPES = [
  { value: "POST", label: "一般討論" },
  { value: "JOB", label: "招人資訊" },
  { value: "PROMOTION", label: "優惠活動" },
];

export default function NewPostPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<string>("POST");
  const [externalUrl, setExternalUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-muted">請先登入才能發布貼文</p>
        <Link href="/login" className="text-primary hover:underline no-underline">
          前往登入
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          type,
          externalUrl: externalUrl || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "發布失敗");
        setLoading(false);
        return;
      }

      router.push("/posts/" + data.id);
    } catch {
      setError("網路錯誤，請稍後再試");
      setLoading(false);
    }
  }

  function getTypeCls(t: { value: string }): string {
    const base = "px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ";
    return base + (type === t.value
      ? "border-primary bg-primary/5 text-primary"
      : "border-border text-muted hover:text-foreground hover:bg-gray-50");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground no-underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回討論區
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-6">發布新貼文</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">貼文類型</label>
          <div className="flex gap-2">
            {POST_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={getTypeCls(t)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            標題 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="貼文標題"
            required
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        {(type === "JOB" || type === "PROMOTION") && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">外部連結</label>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder={type === "JOB" ? "人力銀行職缺連結..." : "優惠活動連結..."}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <p className="text-xs text-muted mt-1">可貼上人力銀行或官網的連結</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            內容 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={type === "JOB" ? "職缺描述、條件、聯絡方式..." : "寫下你的內容..."}
            required
            rows={8}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          {loading ? "發布中..." : "發布貼文"}
        </button>
      </form>
    </div>
  );
}