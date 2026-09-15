# SEO 3차: llms.txt 사이트 안내서

- 상태: 완료
- 담당: Codex
- 시작일: 2026-09-15
- 범위: `/llms.txt` 응답과 검증
- 원고 수정: 없음

## 목적

Clinic GEO의 운영 주체, 사이트 역할, 핵심 정책, 카테고리와 공개 글을 에이전트가 탐색할 수 있는 짧은 Markdown 안내서로 제공한다.

## 확인 근거

- llms.txt v2 제안은 루트의 `/llms.txt`에 H1, 요약, 설명과 링크 섹션을 두는 형식을 제안한다.
- Google Search 공식 문서는 llms.txt를 Google 검색 및 생성형 AI 노출에 필요하지 않은 파일로 설명하며, Google 순위나 가시성에 긍정·부정 영향을 주지 않는다고 명시한다.

## 구현 게이트

- 원고 JSON은 수정하지 않는다.
- 상세 원고를 복제하지 않고 공개 글 목록과 핵심 허브로 연결한다.
- `/sitemap.xml` 및 `/robots.txt`와 역할을 혼동하지 않도록 설명한다.
- Google SEO 효과나 AI 인용을 보장하지 않는다.
- 기존 `public/llms.txt`를 정본으로 유지해 같은 경로의 중복 구현을 만들지 않는다.

## 완료 조건

- [x] `/llms.txt` HTTP 200
- [x] `text/plain; charset=utf-8`
- [x] 사이트명, 운영 주체, 목적과 해석 주의사항
- [x] 핵심 정책·서비스·카테고리·공개 글 목록 링크
- [x] 타입 검사, 린트, 빌드 통과

## 완료 로그

- 2026-09-15: 기존 `public/llms.txt`를 llms.txt v2의 H1·요약·H2 링크 목록 구조에 맞게 정리했다.
- 2026-09-15: 운영사, 편집 기준, 공식 자료, 정정 요청, 서비스·가이드, 카테고리, sitemap·robots 링크를 연결했다.
- 2026-09-15: Google Search 순위나 생성형 AI 노출 신호가 아니라는 해석 주의사항을 본문에 명시했다.
- 2026-09-15: 중복 동적 경로 시안을 제거하고 기존 정적 파일을 정본으로 유지했다.

## 검증

- `Invoke-WebRequest http://localhost:3000/llms.txt` — HTTP 200
- Content-Type — `text/plain; charset=UTF-8`
- 로컬 본문에서 사이트명·운영사·Google 비순위 신호 고지·편집 기준·공식 자료·robots·sitemap 링크 확인
- `npm run typecheck` — 통과
- `npm run lint` — 오류 없음. 작업 범위 밖 `tmp/pptx-risinghills/build-deck.mjs`의 기존 경고 1건
- `npm run build` — 통과

## 인계

- 상세 원고를 llms.txt에 복제하지 않고 `/blog`와 `/sitemap.xml`을 탐색 진입점으로 유지한다.
- Google SEO 성과 항목으로 보고하지 않는다. 다른 에이전트가 실제로 이 파일을 사용하는 경우에만 보조 탐색 경로로 평가한다.
