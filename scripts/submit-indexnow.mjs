import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import indexNow from "../lib/indexnow.js";

const {
  INDEXNOW_ENDPOINT,
  MAX_URLS_PER_REQUEST,
  normalizeIndexNowUrls,
  submitIndexNow,
} = indexNow;

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (!key || process.env[key]) {
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadEnvLocal();

const args = process.argv.slice(2).flatMap((arg) =>
  arg
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean),
);

if (args.length === 0) {
  console.log("IndexNow: 제출할 URL이 없어 API 요청을 건너뜁니다.");
  process.exit(0);
}

const { urlList, skipped } = normalizeIndexNowUrls(args);

if (skipped.length > 0) {
  console.warn("IndexNow: summitfeed.co.kr 외부 URL 또는 잘못된 URL은 제외했습니다.");
  for (const value of skipped) {
    console.warn(`- ${value}`);
  }
}

if (urlList.length === 0) {
  console.log("IndexNow: 제출 가능한 URL이 없어 API 요청을 건너뜁니다.");
  process.exit(0);
}

if (urlList.length > MAX_URLS_PER_REQUEST) {
  console.error(`IndexNow: 한 번에 최대 ${MAX_URLS_PER_REQUEST.toLocaleString("en-US")}개 URL까지만 제출할 수 있습니다.`);
  process.exit(1);
}

try {
  const result = await submitIndexNow(urlList);

  if (result.skippedRequest) {
    console.log("IndexNow: 제출할 URL이 없어 API 요청을 건너뜁니다.");
    process.exit(0);
  }

  const submittedUrls = result.urlList.map((url) => `- ${url}`).join("\n");

  if (result.ok) {
    console.log(`IndexNow 제출 성공: HTTP ${result.status} ${result.statusText}`);
    console.log(`엔드포인트: ${INDEXNOW_ENDPOINT}`);
    console.log(`제출 URL:\n${submittedUrls}`);
    process.exit(0);
  }

  console.error(`IndexNow 제출 실패: HTTP ${result.status} ${result.statusText}`);
  console.error(`엔드포인트: ${INDEXNOW_ENDPOINT}`);
  console.error(`제출 URL:\n${submittedUrls}`);

  if ([400, 403, 422, 429].includes(result.status)) {
    console.error("응답 원문:");
    console.error(result.responseText || "(응답 본문 없음)");
  }

  process.exit(0);
} catch (error) {
  console.error("IndexNow 제출 중 오류가 발생했습니다.");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
