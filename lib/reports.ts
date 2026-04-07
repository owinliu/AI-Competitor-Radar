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
};

function normalizeStringArray(input: unknown): string[] {
  if (Array.isArray(input)) return input.map(String).filter(Boolean);
  if (typeof input === "string") {
    return input
      .split("\n")
      .map((s) => s.replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);
  }
  return [];
}

function parseFile(filename: string): ReportMeta & { content: string } {
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
    content,
  };
}

export function getAllReports(): ReportMeta[] {
  if (!fs.existsSync(reportsDir)) return [];
  return fs
    .readdirSync(reportsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { content: _c, ...meta } = parseFile(f);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getReportBySlug(slug: string) {
  const filename = `${slug}.md`;
  const fullPath = path.join(reportsDir, filename);
  if (!fs.existsSync(fullPath)) return null;
  return parseFile(filename);
}
