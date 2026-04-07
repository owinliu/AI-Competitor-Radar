"use client";
import { useEffect, useState } from "react";

type Item = { id: string; title: string };

export default function ReportToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-20% 0px -70% 0px" });
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} className={`block rounded-md px-2 py-1.5 text-sm ${active === item.id ? "bg-slate-200 text-slate-900" : "text-slate-700 hover:bg-slate-100"}`}>
          {item.title}
        </a>
      ))}
    </nav>
  );
}
