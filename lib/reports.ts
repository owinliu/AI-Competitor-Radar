import fs from "fs";
import path from "path";
import matter from "gray-matter";

const reportsDir = path.join(process.cwd(), "content", "reports");

export type ReportMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags: string[];
  highlights: string[];
  actions: string[];
  competitors: string[];
  dimensions: string[];
  period?: string;
};

function normalizeStringArray(input: unknown): string[] {
  if (Array.isArray(input)) return input.map(String).filter(Boolean);
  if (typeof input === "string") return input.split("\n").map((s) => s.replace(/^[-*]\s*/, "").trim()).filter(Boolean);
  return [];
}

function slugify(input: string) {
  return input.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-").replace(/(^-|-$)/g, "");
}

function extractSections(content: string) {
  const lines = content.split("\n");
  const sections: { id: string; title: string }[] = [];
  for (const line of lines) {
    const m = line.match(/^##\s+(.+)/);
    if (m) {
      const title = m[1].trim();
      sections.push({ id: `sec-${slugify(title)}`, title });
    }
  }
  return sections;
}

function parseFile(filename: string): ReportMeta & { content: string; sections: { id: string; title: string }[] } {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(reportsDir, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    summary: data.summary as string | undefined,
    tags: normalizeStringArray(data.tags),
    highlights: normalizeStringArray(data.highlights),
    actions: normalizeStringArray(data.actions),
    competitors: normalizeStringArray(data.competitors),
    dimensions: normalizeStringArray(data.dimensions),
    period: data.period as string | undefined,
    sections: extractSections(content),
    content,
  };
}

export function getAllReports(): ReportMeta[] {
  if (!fs.existsSync(reportsDir)) return [];
  return fs.readdirSync(reportsDir).filter((f) => f.endsWith(".md")).map((f) => {
    const { content: _c, sections: _s, ...meta } = parseFile(f);
    return meta;
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getReportBySlug(slug: string) {
  const fullPath = path.join(reportsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  return parseFile(`${slug}.md`);
}
