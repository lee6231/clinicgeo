import { createSign } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const resultPath =
  process.env.PUBLISH_RESULT_PATH || ".publish-results/scheduled-publish.json";
const result = JSON.parse(await readFile(resultPath, "utf8"));
const rawCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
const siteUrl = process.env.GSC_SITE_URL;
const sitemapUrl = process.env.GSC_SITEMAP_URL;

if (!rawCredentials || !siteUrl || !sitemapUrl) {
  result.googleSearchConsole = {
    skipped: true,
    reason:
      "GOOGLE_SERVICE_ACCOUNT_JSON, GSC_SITE_URL or GSC_SITEMAP_URL is not configured",
  };
  await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log("Google Search Console: credentials or site settings are missing; skipped.");
  process.exit(0);
}

function parseCredentials(value) {
  try {
    return JSON.parse(value);
  } catch {
    return JSON.parse(Buffer.from(value, "base64").toString("utf8"));
  }
}

function base64Url(value) {
  return Buffer.from(value).toString("base64url");
}

const credentials = parseCredentials(rawCredentials);
const issuedAt = Math.floor(Date.now() / 1000);
const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
const payload = base64Url(
  JSON.stringify({
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/webmasters",
    aud: credentials.token_uri || "https://oauth2.googleapis.com/token",
    iat: issuedAt,
    exp: issuedAt + 3600,
  }),
);
const signer = createSign("RSA-SHA256");
signer.update(`${header}.${payload}`);
const assertion = `${header}.${payload}.${signer.sign(credentials.private_key, "base64url")}`;
const tokenResponse = await fetch(
  credentials.token_uri || "https://oauth2.googleapis.com/token",
  {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  },
);

if (!tokenResponse.ok) {
  throw new Error(`Google OAuth failed: HTTP ${tokenResponse.status}`);
}

const { access_token: accessToken } = await tokenResponse.json();
const authorization = { Authorization: `Bearer ${accessToken}` };
const sitemapResponse = await fetch(
  `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    siteUrl,
  )}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
  { method: "PUT", headers: authorization },
);

if (!sitemapResponse.ok) {
  throw new Error(`Search Console sitemap submit failed: HTTP ${sitemapResponse.status}`);
}

const inspections = [];
for (const article of result.articles) {
  const response = await fetch(
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers: {
        ...authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inspectionUrl: article.url,
        siteUrl,
        languageCode: "ko-KR",
      }),
    },
  );
  const body = await response.json().catch(() => ({}));
  inspections.push({
    url: article.url,
    ok: response.ok,
    status: response.status,
    verdict: body?.inspectionResult?.indexStatusResult?.verdict,
    coverageState: body?.inspectionResult?.indexStatusResult?.coverageState,
    indexingState: body?.inspectionResult?.indexStatusResult?.indexingState,
    robotsTxtState: body?.inspectionResult?.indexStatusResult?.robotsTxtState,
    lastCrawlTime: body?.inspectionResult?.indexStatusResult?.lastCrawlTime,
  });
}

result.googleSearchConsole = {
  skipped: false,
  sitemapSubmitted: true,
  inspections,
  note: "URL Inspection reports status only; it does not request indexing.",
};
await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result.googleSearchConsole, null, 2));
