# ITI 福利社平台

校友交流 × 職涯發展 × 福利共享 — 專屬於 ITI 校友的社群平台。

## 功能

- **貼文系統** — 發布一般討論、招人資訊、優惠活動三種貼文
- **身分驗證** — Email 註冊/登入，支援畢業年度、班別或推薦人驗證
- **個人資料** — 校友資訊管理
- **管理後台** — 用戶/貼文/回應統計儀表板
- **社團入口** — 預留（開發中）
- **商城入口** — 預留（開發中）

## 技術架構

| 層級 | 技術 | 版本 |
|------|------|------|
| 前端框架 | Next.js | 16.2.9 |
| UI 框架 | React | 19.2.7 |
| 型別系統 | TypeScript | 6.0.3 |
| CSS 框架 | Tailwind CSS | 4.3.1 |
| ORM | Prisma | 6.19.3 |
| 資料庫 | PostgreSQL 16 (Docker) / SQLite (本地開發) |
| 驗證 | NextAuth.js (Auth.js v5) | 5.0.0-beta.31 |
| 圖示 | lucide-react | 1.21 |
| 驗證庫 | zod | 4.4 |

## 快速開始

```bash
# 安裝依賴
npm install

# 複製環境變數
cp .env.example .env

# 初始化資料庫（SQLite 本地開發）
npx prisma db push
npx tsx prisma/seed.ts

# 啟動開發伺服器
npm run dev
```

## 專案結構

```
iti-platform/
├── prisma/
│   ├── schema.prisma      # 資料庫 Schema
│   ├── seed.ts            # 種子資料
│   └── dev.db             # 本地開發資料庫 (SQLite)
├── src/
│   ├── app/
│   │   ├── (auth)/        # 登入/註冊頁面
│   │   ├── admin/         # 管理後台
│   │   ├── api/           # API Routes
│   │   │   ├── auth/      # 驗證相關 API
│   │   │   └── posts/     # 貼文 CRUD API
│   │   ├── clubs/         # 社團（預留）
│   │   ├── jobs/          # 招人資訊
│   │   ├── posts/         # 討論區
│   │   ├── profile/       # 個人資料
│   │   ├── promotions/    # 優惠活動
│   │   └── shop/          # 商城（預留）
│   ├── components/
│   │   ├── layout/        # Header / Footer
│   │   └── posts/         # PostCard 元件
│   └── lib/
│       ├── prisma.ts      # Prisma Client 初始化
│       └── auth.ts        # NextAuth 設定
├── docs/
│   └── 接手文件/          # 專案管理文件
└── .env                   # 環境變數（不入版控）
```

## 資料庫 Schema

核心模型（完整定義見 `prisma/schema.prisma`）：

- **User** — id, name, email, passwordHash, graduationYear, department, referrer, role
- **Post** — id, title, content, type (POST|JOB|PROMOTION), userId, externalUrl, status
- **Category** — id, name, slug, type (FORUM|JOB|PROMOTION|SHOP)
- **Comment** — id, content, userId, postId, parentId (巢狀回覆)
- **Like** — id, userId, postId (unique 複合鍵)
- **Club** — 預留（未來擴充）
- **Product** — 預留（未來擴充）

## 環境變數

```env
DATABASE_URL="file:./prisma/dev.db"   # 本地開發 (SQLite)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
```

## 佈署

### 生產環境 (Vercel + VPS PostgreSQL)

| 資源 | 位置 | 說明 |
|------|------|------|
| 前端/API | Vercel | https://iti-alumni-platform.vercel.app |
| 資料庫 | VPS 43.163.100.209:5433 | Docker PostgreSQL 16 |
| 自訂網域 | test.chanting-green.com | 需設定 DNS A 記錄 → 76.76.21.21 |

### Vercel 環境變數

| 變數 | 值 |
|------|-----|
| DATABASE_URL | `postgresql://iti_app:iti_alumni_2024@43.163.100.209:5433/iti_alumni_db` |
| NEXTAUTH_URL | `https://test.chanting-green.com`（或 Vercel URL） |
| NEXTAUTH_SECRET | （隨機產生的 hex 字串） |

### 資料庫移轉

如需搬遷資料庫至新位置：
1. 修改 `prisma/schema.prisma` 中的 provider（如需要）
2. 在新的資料庫執行 `npx prisma db push`
3. 執行 `npx tsx prisma/seed.ts` 匯入種子資料
4. 更新 `DATABASE_URL` 環境變數

## 本地開發注意事項

- 本地使用 SQLite（`prisma/dev.db`），VPS 上使用 PostgreSQL
- 切換資料庫時需執行 `npx prisma generate` 重新產生 Client
- PowerShell 寫檔案時避免使用 `@"..."@`，改用 `[System.IO.File]::WriteAllText`
- `$` 符號在 PowerShell 雙引號內會被當作變數展開，需用反引號跳脫

## 測試帳號

- 管理員：`admin@iti.edu.tw` / `admin123`
- 一般用戶：自行註冊