import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllReports, getReportBySlug } from "@/lib/reports";

export function generateStaticParams() {
  return getAllReports().map((r) => ({ slug: r.slug }));
}

export default function ReportPage({ params }: { params: { slug: string } }) {
  const report = getReportBySlug(params.slug);
  if (!report) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link href="/" className="text-sm text-accent">← 返回首页</Link>

      <section className="hero-glow glass mt-4 rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Weekly Competitor Report</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">{report.title}</h1>
        <p className="mt-4 text-sm text-muted md:text-base">{report.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-md border border-white/20 px-2 py-1 text-xs text-muted">{report.date}</span>
          {report.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-white/20 px-2 py-1 text-xs text-muted">{tag}</span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold">结论先行</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-100">
            {report.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-semibold">30天动作</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-100">
            {report.actions.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>

      <section className="glass mt-6 rounded-2xl p-5 md:p-6">
        <h2 className="text-xl font-semibold">结构化主表与明细</h2>
        <article className="prose prose-invert mt-4 max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{report.content}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}
