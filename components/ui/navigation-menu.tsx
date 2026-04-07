import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavigationMenu({ items, current }: { items: { href: string; label: string }[]; current?: string }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={cn("rounded-lg px-3 py-2 text-xs", current?.startsWith(item.href) ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-100")}>{item.label}</Link>
      ))}
    </nav>
  );
}
