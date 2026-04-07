import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllReports } from "@/lib/reports";

export default function HomePage() {
  const reports = getAllReports();

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <section className="rounded-2xl border border-border bg-card p-8">
        <p className="text-sm text-accent">AI Competitor Radar</p>
        <h1 className="mt-2 text-3xl font-bold">竞品分析报告中心</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          统一输出“结论先行 + 证据对比 + 行动建议”的可读报告页面。飞书持续同步，网页用于展示与复盘。
        </p>
      </section>

      <div className="mt-8 grid gap-4">
        {reports.map((report) => (
          <Link key={report.slug} href={`/reports/${report.slug}`}>
            <Card className="transition hover:-translate-y-0.5 hover:border-accent">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle>{report.title}</CardTitle>
                  <Badge>{report.date}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted">{report.summary || "查看完整分析"}</p>
                {report.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {report.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
