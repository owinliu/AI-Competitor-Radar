import { getAllReports, getReportBySlug } from "@/lib/reports";
import ReportInsightPanel from "@/components/report-insight-panel";

export default function DashboardPage() {
  const reports = getAllReports();
  const latestMeta = reports[0];
  const latest = latestMeta ? getReportBySlug(latestMeta.slug) : null;

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-card p-6">
        <h1 className="text-2xl font-semibold">竞品追踪工作台</h1>
        <p className="mt-2 text-sm text-muted-foreground">主区直接展示最新报告原文，减少二次点击。</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[["周报总数", String(reports.length)], ["当前周期", "0402 vs 0323"], ["高影响项", "3"], ["证据图片", "10"]].map(([k, v]) => (
          <div key={k} className="rounded-xl border bg-card p-4">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-2 text-2xl font-semibold">{v}</p>
          </div>
        ))}
      </section>

      {latest && (
        <section className="rounded-xl border bg-card p-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">最新报告（筛选联动）</p>
          <h2 className="mt-2 text-xl font-semibold">{latest.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{latest.summary}</p>

          {latest.insights.length > 0 ? (
            <div className="mt-5">
              <ReportInsightPanel insights={latest.insights} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">该报告暂无结构化 insights，暂无法筛选联动。</p>
          )}
        </section>
      )}
    </div>
  );
}
