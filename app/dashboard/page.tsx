import Link from "next/link";
import { getAllReports } from "@/lib/reports";

export default function DashboardPage() {
  const reports = getAllReports();
  const latest = reports[0];

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">竞品追踪工作台</h1>
        <p className="mt-2 text-sm text-slate-600">左侧导航管理模块，二级导航对应报告章节，主区展示每周报告与证据。</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[["周报总数", String(reports.length)], ["当前周期", "0402 vs 0323"], ["高影响项", "3"], ["证据图片", "10"]].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs text-slate-500">{k}</p>
            <p className="mt-2 text-2xl font-semibold">{v}</p>
          </div>
        ))}
      </section>

      {latest && (
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <p className="text-xs uppercase tracking-wide text-slate-500">最新报告</p>
          <h2 className="mt-2 text-xl font-semibold">{latest.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{latest.summary}</p>
          <Link href={`/reports/${latest.slug}`} className="mt-4 inline-block rounded-lg bg-[#ff642d] px-4 py-2 text-sm font-semibold text-white">进入报告</Link>
        </section>
      )}
    </div>
  );
}
