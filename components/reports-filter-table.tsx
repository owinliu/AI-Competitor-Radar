"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Row = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  competitors: string[];
  dimensions: string[];
  period?: string;
};

export default function ReportsFilterTable({ rows }: { rows: Row[] }) {
  const [q, setQ] = useState("");
  const [competitor, setCompetitor] = useState("全部");
  const [dimension, setDimension] = useState("全部");
  const [period, setPeriod] = useState("全部");

  const competitors = ["全部", ...Array.from(new Set(rows.flatMap((r) => r.competitors)))];
  const dimensions = ["全部", ...Array.from(new Set(rows.flatMap((r) => r.dimensions)))];
  const periods = ["全部", ...Array.from(new Set(rows.map((r) => r.period).filter(Boolean) as string[]))];

  const filtered = useMemo(() => rows.filter((r) => {
    if (competitor !== "全部" && !r.competitors.includes(competitor)) return false;
    if (dimension !== "全部" && !r.dimensions.includes(dimension)) return false;
    if (period !== "全部" && r.period !== period) return false;
    if (!q) return true;
    const text = `${r.title} ${r.tags.join(" ")} ${r.competitors.join(" ")} ${r.dimensions.join(" ")}`.toLowerCase();
    return text.includes(q.toLowerCase());
  }), [rows, q, competitor, dimension, period]);

  return (
    <div className="grid gap-4 md:grid-cols-[240px_1fr]">
      <aside className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold">筛选器</p>
        <div className="mt-3 space-y-3 text-sm">
          <Input placeholder="关键词搜索" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="h-9 w-full rounded-md border border-slate-200 px-2" value={competitor} onChange={(e) => setCompetitor(e.target.value)}>{competitors.map((x) => <option key={x}>{x}</option>)}</select>
          <select className="h-9 w-full rounded-md border border-slate-200 px-2" value={dimension} onChange={(e) => setDimension(e.target.value)}>{dimensions.map((x) => <option key={x}>{x}</option>)}</select>
          <select className="h-9 w-full rounded-md border border-slate-200 px-2" value={period} onChange={(e) => setPeriod(e.target.value)}>{periods.map((x) => <option key={x}>{x}</option>)}</select>
        </div>
      </aside>

      <div className="rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>标题</TableHead><TableHead>日期</TableHead><TableHead>竞品</TableHead><TableHead>维度</TableHead><TableHead>周期</TableHead><TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.slug}>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.competitors.join("/")}</TableCell>
                <TableCell>{r.dimensions.join("/")}</TableCell>
                <TableCell>{r.period || "-"}</TableCell>
                <TableCell><Link href={`/reports/${r.slug}`} className="text-[#ff642d]">查看详情</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
