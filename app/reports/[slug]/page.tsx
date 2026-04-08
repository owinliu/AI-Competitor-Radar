import { getAllReports } from "@/lib/reports";

export function generateStaticParams() {
  return getAllReports().map((r) => ({ slug: r.slug }));
}

export default function ReportSlugFallbackPage() {
  return null;
}
