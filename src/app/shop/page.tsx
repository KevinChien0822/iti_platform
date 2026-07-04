import { ShoppingBag, Construction } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">商城</h1>
        <p className="text-sm text-muted mt-1">商品上架與官網串接</p>
      </div>

      <div className="bg-white border border-border rounded-lg p-12 text-center">
        <Construction className="w-16 h-16 mx-auto mb-4 text-muted" />
        <h2 className="text-xl font-semibold text-foreground mb-2">即將推出</h2>
        <p className="text-muted max-w-md mx-auto">
          商城功能正在規劃中，未來支援商品上架、
          官網商品串接與金流整合，敬請期待。
        </p>
      </div>
    </div>
  );
}
