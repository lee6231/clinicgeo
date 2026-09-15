# SEO 4차: 전체 공개 URL 자동 감사

- 상태: 완료
- 담당: Codex
- 시작일: 2026-09-15
- 범위: 기술 SEO 검사 스크립트와 로컬 감사 보고
- 원고·디자인 수정: 없음

## 목적

sitemap에 포함된 공개 URL과 robots.txt, sitemap.xml, llms.txt를 같은 기준으로 반복 검사한다. 메타 제목·설명, canonical, Open Graph, X 카드, H1, JSON-LD의 누락과 중복을 배포 전에 찾는다.

## 구현 게이트

- 원고 JSON과 화면 컴포넌트는 수정하지 않는다.
- 추가 패키지 없이 Node.js 기본 기능으로 실행한다.
- 로컬 서버를 검사하되 canonical은 운영 도메인 기준으로 대조한다.
- 오류와 경고를 구분하고 오류가 있으면 실패 종료 코드를 반환한다.
- 외부 서비스의 색인·순위·AI 인용 결과는 추측하지 않는다.

## 완료 조건

- [x] sitemap의 모든 URL HTTP 상태 검사
- [x] title·description·canonical·robots·H1 검사
- [x] OG·X 카드와 OG 이미지 응답 검사
- [x] JSON-LD 파싱 및 타입 수집
- [x] title·description·canonical 중복 검사
- [x] robots.txt·sitemap.xml·llms.txt 응답 검사
- [x] npm 명령 등록 및 실제 로컬 실행

## 구현

- `scripts/audit-seo.mjs`: sitemap 기반 공개 URL과 루트 SEO 파일 감사
- `npm run seo:audit`: 기본 대상 `http://localhost:3000`
- 선택 입력: 첫 번째 인자로 검사 origin, `SEO_AUDIT_CANONICAL_ORIGIN`으로 canonical 기준 origin 지정

## 검증

- `npm run seo:audit` — sitemap URL 26/26, 소셜 이미지 26개, 오류 0건, 경고 0건
- `npm run typecheck` — 통과
- `npm run lint` — 오류 없음. 작업 범위 밖 `tmp/pptx-risinghills/build-deck.mjs`의 기존 경고 1건
- `npm run build` — 통과

## 인계

- 로컬 서버를 실행한 뒤 `npm run seo:audit`를 실행한다.
- 오류가 하나라도 있으면 종료 코드 1을 반환하므로 배포 전 검사나 CI에 연결할 수 있다.
- 이 검사는 HTML과 공개 파일의 기술 일관성을 확인하며, 실제 색인·순위·AI 인용을 보장하거나 측정하지 않는다.
