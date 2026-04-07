import Link from "next/link";
import { getAllReports } from "@/lib/reports";

export default function ReportsPage() {
  const reports = getAllReports();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">周报中心</h1>
      <p className="mt-2 text-sm text-slate-600">按周查看结构化分析报告。</p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600">
              <th className="border-b border-slate-200 px-3 py-2">标题</th>
              <th className="border-b border-slate-200 px-3 py-2">日期</th>
              <th className="border-b border-slate-200 px-3 py-2">标签</th>
              <th className="border-b border-slate-200 px-3 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.slug}>
                <td className="border-b border-slate-100 px-3 py-3 font-medium">{r.title}</td>
                <td className="border-b border-slate-100 px-3 py-3">{r.date}</td>
                <td className="border-b border-slate-100 px-3 py-3">{r.tags.join(" / ")}</td>
                <td className="border-b border-slate-100 px-3 py-3">
                  <Link href={`/reports/${r.slug}`} className="text-[#ff642d] hover:underline">查看详情</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
