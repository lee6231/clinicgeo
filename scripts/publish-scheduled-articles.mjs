import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const nowArg = args.find((arg) => arg.startsWith("--now="))?.slice(6);
const now = nowArg ? new Date(nowArg) : new Date();
const siteUrl = (process.env.SITE_URL || "https://clinicgeo.co.kr").replace(/\/$/, "");
const articleRoute = process.env.ARTICLE_ROUTE || "/blog";
const articlesDir = path.resolve(
  process.env.ARTICLES_DIR || path.join(process.cwd(), "content", "articles"),
);
const resultPath = path.resolve(
  process.env.PUBLISH_RESULT_PATH || ".publish-results/scheduled-publish.json",
);

if (Number.isNaN(now.getTime())) {
  throw new Error(`Invalid --now value: ${nowArg}`);
}

const files = (await readdir(articlesDir)).filter((file) => file.endsWith(".json"));
const dueArticles = [];

for (const file of files) {
  const filePath = path.join(articlesDir, file);
  const article = JSON.parse(await readFile(filePath, "utf8"));
  const fileSlug = path.basename(file, ".json");

  if (article.slug !== fileSlug) {
    throw new Error(`Filename and slug differ: ${file} / ${article.slug}`);
  }

  if (article.published !== false || !article.publishAt) {
    continue;
  }

  const publishAt = new Date(article.publishAt);

  if (Number.isNaN(publishAt.getTime())) {
    throw new Error(`Invalid publishAt in ${file}: ${article.publishAt}`);
  }

  if (now < publishAt) {
    continue;
  }

  dueArticles.push({
    file,
    filePath,
    article,
    url: `${siteUrl}${articleRoute}/${article.slug}`,
  });
}

if (!dryRun) {
  for (const item of dueArticles) {
    item.article.published = true;
    await writeFile(item.filePath, `${JSON.stringify(item.article, null, 2)}\n`, "utf8");
  }
}

const result = {
  dryRun,
  checkedAt: now.toISOString(),
  changed: !dryRun && dueArticles.length > 0,
  wouldPublish: dueArticles.length > 0,
  articles: dueArticles.map(({ article, file, url }) => ({
    file,
    slug: article.slug,
    title: article.title,
    publishAt: article.publishAt,
    url,
  })),
};

await mkdir(path.dirname(resultPath), { recursive: true });
await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");

if (process.env.GITHUB_OUTPUT) {
  const output = [
    `changed=${result.changed}`,
    `would_publish=${result.wouldPublish}`,
    `result_path=${resultPath.replaceAll("\\", "/")}`,
    `urls=${JSON.stringify(result.articles.map((article) => article.url))}`,
  ].join("\n");
  await writeFile(process.env.GITHUB_OUTPUT, `${output}\n`, { flag: "a" });
}

console.log(JSON.stringify(result, null, 2));
