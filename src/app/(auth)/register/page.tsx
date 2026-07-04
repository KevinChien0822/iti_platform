"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [department, setDepartment] = useState("");
  const [referrer, setReferrer] = useState("");
  const [useReferrer, setUseReferrer] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!useReferrer && (!graduationYear || !department)) {
      setError("請填寫畢業資訊，或切換至「推薦人」方式");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          graduationYear: useReferrer ? null : graduationYear,
          department: useReferrer ? null : department,
          referrer: useReferrer ? referrer : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "註冊失敗");
        setLoading(false);
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("網路錯誤，請稍後再試");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-border rounded-lg p-8">
        <div className="text-center mb-8">
          <UserPlus className="w-10 h-10 mx-auto mb-3 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">註冊</h1>
          <p className="text-sm text-muted mt-1">加入 ITI 校友福利社</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              姓名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="您的姓名"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              密碼 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="至少 6 個字元"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* 身份驗證方式切換 */}
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium text-foreground mb-3">身份驗證方式</p>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setUseReferrer(false)}
                className={"px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer " +
                  (!useReferrer
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted hover:text-foreground")}
              >
                畢業資訊
              </button>
              <button
                type="button"
                onClick={() => setUseReferrer(true)}
                className={"px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer " +
                  (useReferrer
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted hover:text-foreground")}
              >
                推薦人
              </button>
            </div>

            {useReferrer ? (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  推薦人姓名或 Email
                </label>
                <input
                  type="text"
                  value={referrer}
                  onChange={(e) => setReferrer(e.target.value)}
                  placeholder="哪位校友推薦您加入的？"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted mt-1">
                  填寫推薦您的校友姓名或 Email
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    畢業年度
                  </label>
                  <input
                    type="number"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    班別 / 科系
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. 英語商務班 / 科技管理組"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "註冊中..." : "註冊"}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          已經有帳號了？{" "}
          <Link href="/login" className="text-primary hover:underline no-underline">
            登入
          </Link>
        </p>
      </div>
    </div>
  );
}