import { Users, Construction } from "lucide-react";

export default function ClubsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">社團</h1>
        <p className="text-sm text-muted mt-1">校友社團進駐與交流</p>
      </div>

      <div className="bg-white border border-border rounded-lg p-12 text-center">
        <Construction className="w-16 h-16 mx-auto mb-4 text-muted" />
        <h2 className="text-xl font-semibold text-foreground mb-2">即將推出</h2>
        <p className="text-muted max-w-md mx-auto">
          社團功能正在開發中，未來校友社團可以申請進駐平台，
          建立專屬社團頁面、發布社團活動與招新資訊。
        </p>
      </div>
    </div>
  );
}
