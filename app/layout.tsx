import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Competitor Radar",
  description: "竞品分析工具站",
};

const mainNav = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/reports", label: "周报中心" },
  { href: "/evidence", label: "证据库" },
  { href: "/settings", label: "配置" },
];

const reportSubNav = [
  "本周概览",
  "APP",
  "风控",
  "客服",
  "消金",
  "留存促活运营",
  "综合判断",
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="min-h-screen bg-[#f5f6fa] text-[#1f2430]">
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex h-14 items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-md bg-[#ff642d]" />
                <span className="text-sm font-semibold">AI Competitor Radar</span>
              </div>
              <div className="flex w-[420px] max-w-[55vw] items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5">
                <input
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="搜索报告、维度、结论..."
                />
              </div>
            </div>
          </header>

          <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 md:grid-cols-[72px_220px_1fr]">
            <aside className="hidden border-r border-slate-200 bg-white md:block">
              <nav className="flex flex-col gap-2 p-3">
                {mainNav.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            <aside className="hidden border-r border-slate-200 bg-[#f8f9fd] md:block">
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">周报模块导航</p>
                <nav className="mt-3 space-y-1">
                  {reportSubNav.map((item, i) => (
                    <a key={item} href={`#sec-${i}`} className="block rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-200/70">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <main className="min-w-0 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
