import fs from "fs";
import path from "path";
import matter from "gray-matter";

const aliasesPath = path.join(process.cwd(), "config", "page-aliases.json");
const reportsDir = path.join(process.cwd(), "content", "reports");

const aliasCfg = JSON.parse(fs.readFileSync(aliasesPath, "utf8"));
const aliases = aliasCfg.aliases || {};

function normPage(p = "") {
  const x = String(p).trim();
  return aliases[x] || x;
}

const files = fs.readdirSync(reportsDir).filter((f) => f.endsWith(".md"));
let hasIssue = false;

for (const f of files) {
  const raw = fs.readFileSync(path.join(reportsDir, f), "utf8");
  const { data } = matter(raw);
  const insights = Array.isArray(data.insights) ? data.insights : [];
  const seen = new Map();

  for (const i of insights) {
    const key = `${i.competitor}|${i.dimension}|${i.period}|${normPage(i.page)}`;
    if (seen.has(key)) {
      hasIssue = true;
      console.log(`[CONFLICT] ${f}`);
      console.log(`  key: ${key}`);
      console.log(`  existing: ${seen.get(key)} | duplicate: ${i.id || "(no-id)"}`);
    } else {
      seen.set(key, i.id || "(no-id)");
    }
  }
}

if (!hasIssue) {
  console.log("OK: no same-slot duplicate conflicts found.");
}
