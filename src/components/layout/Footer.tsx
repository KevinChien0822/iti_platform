import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-foreground mb-2">ITI 福利社</h3>
            <p className="text-sm text-muted">
              校友交流 × 職涯發展 × 福利共享
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-2">功能</h4>
            <div className="space-y-1">
              <Link href="/posts" className="block text-sm text-muted hover:text-foreground no-underline">討論區</Link>
              <Link href="/jobs" className="block text-sm text-muted hover:text-foreground no-underline">招人資訊</Link>
              <Link href="/promotions" className="block text-sm text-muted hover:text-foreground no-underline">優惠活動</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-2">即將推出</h4>
            <div className="space-y-1">
              <span className="block text-sm text-muted">社團進駐</span>
              <span className="block text-sm text-muted">商品商城</span>
              <span className="block text-sm text-muted">官網串接</span>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-6 pt-4 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} ITI 福利社平台
        </div>
      </div>
    </footer>
  );
}
