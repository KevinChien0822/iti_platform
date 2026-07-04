import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PostCard } from "@/components/posts/PostCard";
import {
  MessageSquare,
  Briefcase,
  Tag,
  Users,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

async function getRecentPosts() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      user: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
      _count: { select: { comments: true, likes: true } },
    },
  });
  return posts;
}

export default async function HomePage() {
  const session = await auth();
  const posts = await getRecentPosts();

  const quickActions = [
    { href: "/posts/new", label: "發布帖子", icon: MessageSquare, bg: "bg-blue-50", text: "text-blue-600" },
    { href: "/posts?type=job", label: "招人資訊", icon: Briefcase, bg: "bg-green-50", text: "text-green-600" },
    { href: "/posts?type=promotion", label: "優惠活動", icon: Tag, bg: "bg-amber-50", text: "text-amber-600" },
  ];

  const futureFeatures = [
    { icon: Users, label: "社團進駐", desc: "即將推出 — 校友社團可申請進駐" },
    { icon: ShoppingBag, label: "商品商城", desc: "即將推出 — 商品上架與官網串接" },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ITI 校友福利社
          </h1>
          <p className="text-lg text-muted mb-8 max-w-xl">
            校友交流 x 職涯發展 x 福利共享 — 專屬於 ITI 校友的社群平台
          </p>

          {session?.user ? (
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => {
                const cls = "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm no-underline transition-colors hover:opacity-80 " + action.bg + " " + action.text;
                return (
                  <Link key={action.href} href={action.href} className={cls}>
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <Link href="/register" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm no-underline hover:bg-primary-dark transition-colors">
                立即註冊
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-foreground border border-border rounded-lg font-medium text-sm no-underline hover:bg-gray-50 transition-colors">
                登入
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">最新貼文</h2>
          <Link href="/posts" className="text-sm text-primary no-underline hover:underline">
            查看全部 →
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted bg-gray-50 rounded-lg">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="font-medium">還沒有貼文</p>
            <p className="text-sm mt-1">成為第一個發文的人吧！</p>
          </div>
        )}
      </section>

      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-foreground mb-6">即將推出</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {futureFeatures.map((feature) => (
              <div key={feature.label} className="flex items-start gap-4 p-4 border border-border rounded-lg bg-white">
                <div className="p-2 rounded-lg bg-gray-50">
                  <feature.icon className="w-5 h-5 text-muted" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.label}</h3>
                  <p className="text-sm text-muted mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}