"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  MessageSquare,
  Briefcase,
  Tag,
  Users,
  ShoppingBag,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/posts", label: "討論區", icon: MessageSquare },
  { href: "/posts?type=job", label: "招人", icon: Briefcase },
  { href: "/posts?type=promotion", label: "優惠", icon: Tag },
  { href: "/clubs", label: "社團", icon: Users },
  { href: "/shop", label: "商城", icon: ShoppingBag },
];

export function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-primary no-underline">
            ITI 福利社
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-foreground rounded-md hover:bg-gray-100 transition-colors no-underline"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground no-underline"
              >
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                  {session.user.name?.[0] || session.user.email?.[0] || "?"}
                </div>
                <span className="hidden sm:inline">{session.user.name || session.user.email}</span>
              </Link>
              {(session.user as Record<string, unknown>).role === "ADMIN" && (
                <Link href="/admin" className="text-xs text-muted hover:text-foreground no-underline">
                  管理
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1 text-xs text-muted hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">登出</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Link
                href="/login"
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted hover:text-foreground rounded-md hover:bg-gray-100 transition-colors no-underline"
              >
                <LogIn className="w-4 h-4" />
                登入
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors no-underline"
              >
                <UserPlus className="w-4 h-4" />
                註冊
              </Link>
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-2 p-1.5 rounded-md hover:bg-gray-100 bg-transparent border-none cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-foreground rounded-md hover:bg-gray-100 transition-colors no-underline"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}