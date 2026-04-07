import Link from "next/link";
import { getAllReports } from "@/lib/reports";

export default function HomePage() {
  const reports = getAllReports();
  const latest = reports[0];

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 pt-8 md:pt-12">
        <div className="hero-glow glass rounded-3xl p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.22em] text-accent">AI COMPETITOR RADAR</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            竞品周报，像产品功能页一样好读
          </h1>
          <p className="mt-5 max-w-3xl text-base text-muted md:text-lg">
            用“结论先行 + 证据对照 + 影响评估 + 30天动作”输出管理层可执行洞察。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {latest && (
              <Link href={`/reports/${latest.slug}`} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:opacity-90">
                查看最新报告
              </Link>
            )}
            <a href="#report-list" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10">
              浏览历史报告
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-4">
        {[
          ["周报频率", "Weekly"],
          ["固定维度", "5 大模块"],
          ["证据要求", "截图可追溯"],
          ["输出方式", "飞书 + Web"],
        ].map(([k, v]) => (
          <div key={k} className="glass rounded-2xl p-4">
            <p className="text-xs text-muted">{k}</p>
            <p className="mt-2 text-xl font-semibold md:text-2xl">{v}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6">
        <h2 className="text-2xl font-semibold md:text-3xl">为什么这套报告更好用</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["结论先行", "先给方向再看细节，管理层阅读路径更短。"],
            ["结构化对比", "固定表头对齐上期/本期，减少口径漂移。"],
            ["证据可追溯", "每条关键结论绑定截图来源，支持复核。"],
          ].map(([title, desc]) => (
            <article key={title} className="glass rounded-2xl p-5">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="report-list" className="mx-auto mt-14 max-w-7xl px-6 pb-16">
        <h2 className="text-2xl font-semibold md:text-3xl">报告列表</h2>
        <div className="mt-6 grid gap-4">
          {reports.map((report) => (
            <Link key={report.slug} href={`/reports/${report.slug}`} className="glass rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-accent">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{report.title}</h3>
                <span className="rounded-md border border-white/20 px-2 py-1 text-xs text-muted">{report.date}</span>
              </div>
              <p className="mt-3 text-sm text-muted">{report.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
