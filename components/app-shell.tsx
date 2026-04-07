"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Sheet } from "@/components/ui/sheet";

const mainNav = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/reports", label: "周报中心" },
  { href: "/evidence", label: "证据库" },
  { href: "/settings", label: "配置" },
];

const secondNav = [
  { href: "/reports", label: "全部周报" },
  { href: "/reports?dimension=APP", label: "APP专题" },
  { href: "/reports?dimension=风控", label: "风控专题" },
  { href: "/reports?dimension=客服", label: "客服专题" },
  { href: "/reports?dimension=消金", label: "消金专题" },
  { href: "/reports?dimension=留存促活运营", label: "运营专题" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#f5f6fa] text-[#1f2430]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Sheet trigger={<button className="rounded border px-2 py-1 text-xs md:hidden">菜单</button>}>
              <NavigationMenu items={mainNav} current={pathname} />
            </Sheet>
            <div className="h-7 w-7 rounded-md bg-[#ff642d]" />
            <span className="text-sm font-semibold">AI Competitor Radar</span>
          </div>
          <Link href="/reports" className="text-sm text-slate-600">周报中心</Link>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 md:grid-cols-[72px_220px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-white md:block">
          <NavigationMenu items={mainNav} current={pathname} />
        </aside>

        <aside className="hidden border-r border-slate-200 bg-[#f8f9fd] md:block">
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">二级导航</p>
            <nav className="mt-3 space-y-1">
              {secondNav.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-200/70">{item.label}</Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
