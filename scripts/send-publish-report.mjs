import { readFile, writeFile } from "node:fs/promises";

const resultPath =
  process.env.PUBLISH_RESULT_PATH || ".publish-results/scheduled-publish.json";
const result = JSON.parse(await readFile(resultPath, "utf8"));
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.PUBLISH_EMAIL_FROM;
const to = process.env.PUBLISH_EMAIL_TO;

if (!apiKey || !from || !to) {
  result.emailReport = {
    skipped: true,
    reason: "RESEND_API_KEY, PUBLISH_EMAIL_FROM or PUBLISH_EMAIL_TO is not configured",
  };
  await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log("Publish report email: email secrets are missing; skipped.");
  process.exit(0);
}

const lines = result.articles
  .map((article) => `- ${article.title}\n  ${article.url}`)
  .join("\n");
const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: `[Clinic GEO] 예약 아티클 발행 결과 ${new Date().toLocaleDateString("ko-KR")}`,
    text: [
      "예약 아티클 발행 결과입니다.",
      "",
      lines,
      "",
      `운영 검증: ${result.verification?.every((item) => item.ok) ? "통과" : "확인 필요"}`,
      `Google Search Console: ${
        result.googleSearchConsole?.skipped ? "자동 확인 미설정" : "사이트맵 제출·URL 상태 확인"
      }`,
      "IndexNow 제출은 GitHub Actions 단계에서 별도로 실행됩니다.",
    ].join("\n"),
  }),
});

if (!response.ok) {
  throw new Error(`Resend report failed: HTTP ${response.status}`);
}

result.emailReport = { skipped: false, sent: true };
await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log("Publish report email sent.");
