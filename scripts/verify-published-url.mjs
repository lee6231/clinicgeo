import { readFile, writeFile } from "node:fs/promises";

const resultPath =
  process.env.PUBLISH_RESULT_PATH || ".publish-results/scheduled-publish.json";
const result = JSON.parse(await readFile(resultPath, "utf8"));
const sitemapUrl =
  process.env.SITEMAP_URL || "https://clinicgeo.co.kr/sitemap.xml";
const listUrl =
  process.env.ARTICLE_LIST_URL || "https://clinicgeo.co.kr/blog";
const attempts = Number(process.env.VERIFY_ATTEMPTS || 24);
const delayMs = Number(process.env.VERIFY_DELAY_MS || 25000);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function extractSchemas(html) {
  const matches = html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  return [...matches].flatMap((match) => {
    try {
      const parsed = JSON.parse(match[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [];
    }
  });
}

function hasSchema(schemas, expectedType) {
  return schemas.some((schema) => {
    const types = Array.isArray(schema?.["@type"])
      ? schema["@type"]
      : [schema?.["@type"]];
    return types.includes(expectedType);
  });
}

async function verifyArticle(article) {
  let lastError = "not checked";

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const [pageResponse, sitemapResponse, listResponse] = await Promise.all([
        fetch(article.url, { redirect: "follow" }),
        fetch(sitemapUrl, { redirect: "follow" }),
        fetch(listUrl, { redirect: "follow" }),
      ]);
      const [html, sitemap, listHtml] = await Promise.all([
        pageResponse.text(),
        sitemapResponse.text(),
        listResponse.text(),
      ]);

      if (!pageResponse.ok) throw new Error(`page HTTP ${pageResponse.status}`);
      if (!sitemapResponse.ok) throw new Error(`sitemap HTTP ${sitemapResponse.status}`);
      if (!listResponse.ok) throw new Error(`list HTTP ${listResponse.status}`);

      const canonicalMatch = html.match(
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
      );
      const schemas = extractSchemas(html);
      const checks = {
        canonical: canonicalMatch?.[1]?.replace(/\/$/, "") === article.url.replace(/\/$/, ""),
        sitemap: sitemap.includes(`<loc>${article.url}</loc>`),
        list: listHtml.includes(article.slug) || listHtml.includes(article.title),
        articleSchema:
          hasSchema(schemas, "Article") || hasSchema(schemas, "BlogPosting"),
        faqSchema: hasSchema(schemas, "FAQPage"),
        breadcrumbSchema: hasSchema(schemas, "BreadcrumbList"),
      };

      const failed = Object.entries(checks)
        .filter(([, value]) => !value)
        .map(([key]) => key);

      if (failed.length === 0) {
        return { url: article.url, ok: true, httpStatus: pageResponse.status, checks };
      }

      lastError = `missing checks: ${failed.join(", ")}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    if (attempt < attempts) await wait(delayMs);
  }

  throw new Error(`Production verification failed for ${article.url}: ${lastError}`);
}

const verification = [];
for (const article of result.articles) {
  verification.push(await verifyArticle(article));
}

result.verification = verification;
await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(verification, null, 2));
