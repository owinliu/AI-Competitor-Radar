import { getAllReports } from "@/lib/reports";
import ReportsFilterTable from "@/components/reports-filter-table";

export default function ReportsPage() {
  const reports = getAllReports();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">周报中心</h1>
        <p className="mt-2 text-sm text-slate-600">左侧筛选面板 + 结果表格，支持竞品 / 维度 / 时间过滤。</p>
      </div>
      <ReportsFilterTable rows={reports} />
    </div>
  );
}
