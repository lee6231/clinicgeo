const baseUrl = new URL(
  process.argv[2] ?? process.env.SEO_AUDIT_BASE_URL ?? "http://localhost:3000",
);
const canonicalOrigin = new URL(
  process.env.SEO_AUDIT_CANONICAL_ORIGIN ?? "https://clinicgeo.co.kr",
);

const issues = [];

function addIssue(severity, url, code, message) {
  issues.push({ severity, url, code, message });
}

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tagAttribute(tag, attribute) {
  const match = tag.match(
    new RegExp(`${escapeRegExp(attribute)}=["']([^"']*)["']`, "i"),
  );
  return decodeHtml(match?.[1]);
}

function findTag(html, tagName, attribute, value) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
  return (
    tags.find(
      (tag) => tagAttribute(tag, attribute).toLowerCase() === value.toLowerCase(),
    ) ?? ""
  );
}

function findMeta(html, attribute, value) {
  return tagAttribute(findTag(html, "meta", attribute, value), "content");
}

function findLink(html, rel) {
  return tagAttribute(findTag(html, "link", "rel", rel), "href");
}

function normalizeUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return value;
  }
}

function expectedCanonical(productionUrl) {
  const source = new URL(productionUrl);
  return new URL(`${source.pathname}${source.search}`, canonicalOrigin).toString();
}

function collectJsonLd(html, pageUrl) {
  const nodes = [];
  const matches = html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );

  for (const match of matches) {
    try {
      const parsed = JSON.parse(match[1]);
      const topLevel = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of topLevel) {
        if (Array.isArray(item?.["@graph"])) nodes.push(...item["@graph"]);
        else nodes.push(item);
      }
    } catch (error) {
      addIssue("error", pageUrl, "json-ld-invalid", error.message);
    }
  }

  return nodes;
}

async function fetchPath(pathname) {
  const requestUrl = new URL(pathname, baseUrl);
  try {
    const response = await fetch(requestUrl, {
      redirect: "manual",
      headers: { "user-agent": "ClinicGEO-Local-SEO-Audit/1.0" },
    });
    return {
      requestUrl: requestUrl.toString(),
      response,
      body: await response.text(),
    };
  } catch (error) {
    addIssue("error", requestUrl.toString(), "request-failed", error.message);
    return null;
  }
}

function assertStatus(result, label) {
  if (!result) return false;
  if (result.response.status !== 200) {
    addIssue(
      "error",
      result.requestUrl,
      "http-status",
      `${label}: expected 200, received ${result.response.status}`,
    );
    return false;
  }
  return true;
}

const sitemapResult = await fetchPath("/sitemap.xml");
const robotsResult = await fetchPath("/robots.txt");
const llmsResult = await fetchPath("/llms.txt");

if (assertStatus(sitemapResult, "sitemap.xml")) {
  const contentType = sitemapResult.response.headers.get("content-type") ?? "";
  if (!contentType.includes("xml")) {
    addIssue("warning", sitemapResult.requestUrl, "content-type", contentType);
  }
}

if (assertStatus(robotsResult, "robots.txt")) {
  const contentType = robotsResult.response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/plain")) {
    addIssue("warning", robotsResult.requestUrl, "content-type", contentType);
  }
  if (!robotsResult.body.includes(`${canonicalOrigin.origin}/sitemap.xml`)) {
    addIssue(
      "error",
      robotsResult.requestUrl,
      "robots-sitemap-missing",
      "Production sitemap URL is missing.",
    );
  }
}

if (assertStatus(llmsResult, "llms.txt")) {
  const contentType = llmsResult.response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/plain")) {
    addIssue("error", llmsResult.requestUrl, "content-type", contentType);
  }
  if (!llmsResult.body.startsWith("# Clinic GEO")) {
    addIssue(
      "error",
      llmsResult.requestUrl,
      "llms-heading-missing",
      "The file must start with the Clinic GEO H1.",
    );
  }
}

const sitemapUrls = sitemapResult
  ? [...sitemapResult.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
      decodeHtml(match[1]),
    )
  : [];

if (sitemapUrls.length === 0) {
  addIssue(
    "error",
    sitemapResult?.requestUrl ?? new URL("/sitemap.xml", baseUrl).toString(),
    "sitemap-empty",
    "No URLs found in sitemap.xml.",
  );
}

const pageResults = [];

for (const productionUrl of sitemapUrls) {
  const sourceUrl = new URL(productionUrl);
  const result = await fetchPath(`${sourceUrl.pathname}${sourceUrl.search}`);
  if (!assertStatus(result, "sitemap page")) continue;

  const html = result.body;
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]);
  const description = findMeta(html, "name", "description");
  const canonical = findLink(html, "canonical");
  const robots = findMeta(html, "name", "robots").toLowerCase();
  const ogTitle = findMeta(html, "property", "og:title");
  const ogDescription = findMeta(html, "property", "og:description");
  const ogUrl = findMeta(html, "property", "og:url");
  const ogImage = findMeta(html, "property", "og:image");
  const twitterCard = findMeta(html, "name", "twitter:card");
  const twitterTitle = findMeta(html, "name", "twitter:title");
  const twitterDescription = findMeta(html, "name", "twitter:description");
  const twitterImage = findMeta(html, "name", "twitter:image");
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const htmlLang = tagAttribute(html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang");
  const jsonLdNodes = collectJsonLd(html, productionUrl);
  const jsonLdTypes = jsonLdNodes.flatMap((node) => {
    const type = node?.["@type"];
    return Array.isArray(type) ? type : type ? [type] : [];
  });

  const requiredValues = [
    [title, "title-missing"],
    [description, "description-missing"],
    [canonical, "canonical-missing"],
    [ogTitle, "og-title-missing"],
    [ogDescription, "og-description-missing"],
    [ogUrl, "og-url-missing"],
    [ogImage, "og-image-missing"],
    [twitterCard, "twitter-card-missing"],
    [twitterTitle, "twitter-title-missing"],
    [twitterDescription, "twitter-description-missing"],
    [twitterImage, "twitter-image-missing"],
  ];

  for (const [value, code] of requiredValues) {
    if (!value) addIssue("error", productionUrl, code, "Required metadata is missing.");
  }

  if (canonical && normalizeUrl(canonical) !== normalizeUrl(expectedCanonical(productionUrl))) {
    addIssue(
      "error",
      productionUrl,
      "canonical-mismatch",
      `Expected ${expectedCanonical(productionUrl)}, received ${canonical}`,
    );
  }
  if (ogUrl && normalizeUrl(ogUrl) !== normalizeUrl(expectedCanonical(productionUrl))) {
    addIssue(
      "error",
      productionUrl,
      "og-url-mismatch",
      `Expected ${expectedCanonical(productionUrl)}, received ${ogUrl}`,
    );
  }
  if (robots.includes("noindex")) {
    addIssue("error", productionUrl, "sitemap-noindex", "Sitemap URL is noindex.");
  }
  if (h1Count !== 1) {
    addIssue(
      "error",
      productionUrl,
      "h1-count",
      `Expected one H1, received ${h1Count}.`,
    );
  }
  if (!htmlLang.toLowerCase().startsWith("ko")) {
    addIssue("error", productionUrl, "html-lang", `Received lang=${htmlLang || "missing"}.`);
  }
  if (jsonLdNodes.length === 0) {
    addIssue("warning", productionUrl, "json-ld-missing", "No JSON-LD nodes found.");
  }

  pageResults.push({
    url: productionUrl,
    title,
    description,
    canonical,
    ogImage,
    twitterImage,
    jsonLdTypes,
  });
}

function reportDuplicates(field, code) {
  const groups = new Map();
  for (const page of pageResults) {
    const value = page[field];
    if (!value) continue;
    const urls = groups.get(value) ?? [];
    urls.push(page.url);
    groups.set(value, urls);
  }
  for (const [value, urls] of groups) {
    if (urls.length < 2) continue;
    addIssue(
      "warning",
      urls.join(", "),
      code,
      `${field} is shared by ${urls.length} pages: ${value}`,
    );
  }
}

reportDuplicates("title", "duplicate-title");
reportDuplicates("description", "duplicate-description");
reportDuplicates("canonical", "duplicate-canonical");

const imageUrls = [
  ...new Set(pageResults.flatMap((page) => [page.ogImage, page.twitterImage]).filter(Boolean)),
];

for (const imageUrl of imageUrls) {
  const source = new URL(imageUrl);
  const localImageUrl = new URL(`${source.pathname}${source.search}`, baseUrl);
  try {
    const response = await fetch(localImageUrl, { redirect: "manual" });
    const contentType = response.headers.get("content-type") ?? "";
    if (response.status !== 200 || !contentType.startsWith("image/")) {
      addIssue(
        "error",
        imageUrl,
        "social-image-response",
        `Received ${response.status} ${contentType || "without content type"}.`,
      );
    }
    await response.arrayBuffer();
  } catch (error) {
    addIssue("error", imageUrl, "social-image-request-failed", error.message);
  }
}

const errors = issues.filter((issue) => issue.severity === "error");
const warnings = issues.filter((issue) => issue.severity === "warning");

console.log(`SEO audit target: ${baseUrl.origin}`);
console.log(`Sitemap pages checked: ${pageResults.length}/${sitemapUrls.length}`);
console.log(`Social images checked: ${imageUrls.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

for (const issue of issues) {
  console.log(`\n[${issue.severity.toUpperCase()}] ${issue.code}`);
  console.log(issue.url);
  console.log(issue.message);
}

if (errors.length > 0) process.exitCode = 1;
