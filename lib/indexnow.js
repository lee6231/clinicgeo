const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const SITE_HOST = "clinicgeo.co.kr";
const SITE_ORIGIN = `https://${SITE_HOST}`;
const ALLOWED_HOSTS = new Set([SITE_HOST, "www.clinicgeo.co.kr"]);
const MAX_URLS_PER_REQUEST = 10000;

function normalizeIndexNowUrl(input) {
  if (typeof input !== "string") {
    return null;
  }

  const value = input.trim();

  if (!value) {
    return null;
  }

  let url;

  try {
    url = new URL(value, SITE_ORIGIN);
  } catch {
    return null;
  }

  const hostname = url.hostname.toLowerCase();

  if (!["http:", "https:"].includes(url.protocol) || !ALLOWED_HOSTS.has(hostname)) {
    return null;
  }

  url.protocol = "https:";
  url.hostname = SITE_HOST;
  url.port = "";
  url.hash = "";

  return url.toString();
}

function normalizeIndexNowUrls(inputs) {
  const seen = new Set();
  const urlList = [];
  const skipped = [];

  for (const input of inputs) {
    const normalized = normalizeIndexNowUrl(input);

    if (!normalized) {
      skipped.push(String(input ?? ""));
      continue;
    }

    if (!seen.has(normalized)) {
      seen.add(normalized);
      urlList.push(normalized);
    }
  }

  return { urlList, skipped };
}

function getIndexNowKey(env = process.env) {
  return env.INDEXNOW_KEY?.trim() ?? "";
}

function createIndexNowPayload(urlList, key) {
  return {
    host: SITE_HOST,
    key,
    keyLocation: `${SITE_ORIGIN}/${key}.txt`,
    urlList,
  };
}

async function submitIndexNow(urls, options = {}) {
  const key = options.key?.trim() || getIndexNowKey(options.env);

  if (!key) {
    throw new Error("INDEXNOW_KEY 환경변수가 없습니다. Vercel 또는 로컬 환경에 INDEXNOW_KEY를 등록해 주세요.");
  }

  const { urlList, skipped } = normalizeIndexNowUrls(urls);

  if (urlList.length === 0) {
    return {
      ok: true,
      skippedRequest: true,
      status: null,
      statusText: "No valid URLs",
      urlList,
      skipped,
      responseText: "",
    };
  }

  if (urlList.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`IndexNow는 한 번에 최대 ${MAX_URLS_PER_REQUEST.toLocaleString("en-US")}개 URL까지만 제출할 수 있습니다.`);
  }

  const fetchImpl = options.fetchImpl ?? globalThis.fetch;

  if (typeof fetchImpl !== "function") {
    throw new Error("현재 Node.js 환경에서 fetch를 사용할 수 없습니다. Node.js 18 이상에서 실행해 주세요.");
  }

  const payload = createIndexNowPayload(urlList, key);
  const response = await fetchImpl(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
  const responseText = await response.text();

  return {
    ok: response.status === 200 || response.status === 202,
    skippedRequest: false,
    status: response.status,
    statusText: response.statusText,
    urlList,
    skipped,
    payload,
    responseText,
  };
}

module.exports = {
  INDEXNOW_ENDPOINT,
  SITE_HOST,
  SITE_ORIGIN,
  MAX_URLS_PER_REQUEST,
  normalizeIndexNowUrl,
  normalizeIndexNowUrls,
  createIndexNowPayload,
  submitIndexNow,
};
