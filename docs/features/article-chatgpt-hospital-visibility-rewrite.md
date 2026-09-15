# 파일럿 원고: 챗GPT 병원 노출 가이드 재작성

- 상태: 완료
- 담당: Codex
- 시작일: 2026-09-15
- 대상: `content/articles/chatgpt-hospital-visibility.json`
- 적용 스킬: `seo-copywriting` 구조 A, `openai-docs`

## 목적

기존 원고의 작성자 별칭, 출처 없는 기간·성과 단정, 잘못된 robots.txt 해석을 제거하고 재확인 가능한 기술 점검 가이드로 바꾼다.

## 확인 근거

- Google Search Central robots.txt 안내
- Google Search Central JavaScript SEO 안내
- Google Search Central 구조화 데이터 입문·일반 지침
- 국가법령정보센터 의료법 제57조
- OpenAI 공식 개발자 문서에서 OAI-SearchBot·GPTBot 퍼블리셔 안내는 찾지 못했으므로 미확인으로 처리

## 구현 게이트

- 구조 A의 질문형 H2 순서를 사용한다.
- 확인하지 못한 ChatGPT 내부 선정 기준과 노출 소요 기간을 단정하지 않는다.
- 의료광고 규제 대상 여부를 임의 판정하지 않는다.
- 작성자와 편집 데이터는 `Clinic GEO 편집팀` 정본을 사용한다.
- 기존 URL과 발행일은 유지하고 수정일·확인일만 갱신한다.

## 완료 조건

- [x] 결론 우선 요약과 4개 점검 항목
- [x] 공식 근거 URL과 확인일
- [x] 실제 검색어형 FAQ 5개
- [x] 내부 링크 3개 이상
- [x] 이해관계·면책·미확인 범위 공개
- [x] JSON 파싱, 빌드, 화면, JSON-LD 검증

## 완료 로그

- 2026-09-15: 성형외과 카테고리에 잘못 속해 있던 글을 `hospital-geo`로 이동했다.
- 2026-09-15: 원고 전체를 접근·렌더링·정보 일치·발견 경로의 4개 공개 점검 항목으로 재작성했다.
- 2026-09-15: 근거 없는 노출 기간, 경쟁도, 인용 우선순위와 성과 보장 문구를 제거했다.
- 2026-09-15: 작성자를 `Clinic GEO 편집팀`으로 통일하고 공식 근거 7개, 내부 링크 4개, FAQ 5개, 이해관계·한계 고지를 추가했다.

## 검증

- `Get-Content -Raw -Encoding UTF8 content/articles/chatgpt-hospital-visibility.json | ConvertFrom-Json`
- `npm run typecheck` — 통과
- `npm run lint` — 오류 없음. 작업 범위 밖 `tmp/pptx-risinghills/build-deck.mjs`의 기존 미사용 변수 경고 1건
- `npm run build` — 통과
- `http://localhost:3000/blog/chatgpt-hospital-visibility` — HTTP 200, H1 1개, 데스크톱·모바일 가로 넘침 0
- JSON-LD — `Organization`, `WebSite`, `BlogPosting`, `BreadcrumbList`, `FAQPage` 확인. 작성자·발행일·수정일·OG 이미지·FAQ 5개가 원고와 일치

## 인계

- 이 파일럿의 문체와 검증 강도를 다른 원고로 확대할 수 있다.
- 확대 전에는 각 원고의 주장에 맞는 1차 출처를 별도로 확인해야 하며, 이 글의 근거를 다른 주제에 그대로 재사용하지 않는다.
