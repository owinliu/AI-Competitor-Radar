import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllReports } from "@/lib/reports";

export default function HomePage() {
  const reports = getAllReports();

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <section className="hero-glow glass rounded-3xl p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Competitor Intelligence</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">竞品追踪雷达报告中心</h1>
        <p className="mt-4 max-w-3xl text-sm text-muted md:text-base">
          用管理层可读的网页交互呈现：结论先行、证据对照、影响评估、动作建议。
        </p>
      </section>

      <div className="mt-8 grid gap-4">
        {reports.map((report) => (
          <Link key={report.slug} href={`/reports/${report.slug}`}>
            <Card className="glass rounded-2xl transition duration-200 hover:-translate-y-0.5 hover:border-accent">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-xl">{report.title}</CardTitle>
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
