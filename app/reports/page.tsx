import { getAllReports, getReportBySlug } from "@/lib/reports";
import ReportsCenterClient from "@/components/reports-center-client";

export default function ReportsPage() {
  const metas = getAllReports();
  const reports = metas.map((m) => {
    const d = getReportBySlug(m.slug);
    return {
      slug: m.slug,
      title: m.title,
      date: m.date,
      period: m.period,
      competitors: m.competitors,
      dimensions: m.dimensions,
      insights: d?.insights || [],
    };
  });

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-card p-6">
        <h1 className="text-2xl font-semibold">周报中心（多期运营）</h1>
        <p className="mt-2 text-sm text-muted-foreground">已增强：同义位点配置化、冲突扫描、多期趋势、复核工作流、质量评分与管理层导出。</p>
      </section>
      <ReportsCenterClient reports={reports} />
    </div>
  );
}
