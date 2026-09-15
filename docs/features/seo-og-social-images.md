# SEO 1차: OG·소셜 대표 이미지 자동화

- 상태: 완료
- 담당: Codex
- 작업일: 2026-09-15
- 입력: 2026-09-15 Clinic GEO SEO 감사 결과, 기존 로고·색상, Next.js 16 로컬 문서

## 목적

공개 페이지의 Open Graph와 X(Twitter) 카드에 1200×630 대표 이미지를 제공하고, 글의 `BlogPosting.image`를 같은 이미지 엔티티에 연결한다.

## 구현 결정

- 생성형 사진 대신 기존 Clinic GEO 로고와 브랜드 색상을 사용하는 코드 기반 템플릿을 사용한다.
- `/api/og` 한 곳에서 페이지 제목과 분류 문구를 받아 PNG를 생성한다.
- 일반 페이지는 `buildMetadata`, 글 페이지는 글 제목·카테고리 데이터에서 이미지 URL을 생성한다.
- 제목 길이에 따라 글자 크기를 조절하고 입력 길이를 제한한다.

## 변경 범위

- `app/api/og/route.tsx`: OG 이미지 생성 엔드포인트
- `lib/seo.ts`: 공통 Open Graph·X 이미지 메타데이터
- `app/blog/[slug]/page.tsx`: 글별 이미지 메타데이터와 `BlogPosting.image`

## 완료 조건과 검증

- [x] PNG 응답 200, `image/png`, 1200×630
- [x] 한글·영문 혼합 제목 렌더링
- [x] 현재 최장 글 제목이 이미지 안에서 잘리지 않음
- [x] 사이트맵 25개 URL 모두 `og:image` 출력
- [x] 사이트맵 25개 URL 모두 `twitter:image` 출력
- [x] 글 `BlogPosting.image`가 글별 OG 이미지와 연결
- [x] `npm run typecheck`
- [x] 대상 파일 ESLint
- [x] `npm run build`

## 인계

- 운영 배포는 이 작업에 포함하지 않았다.
- 배포 후 카카오톡·Facebook·LinkedIn 등 공유 캐시를 새 URL로 재검사한다.
- 디자인을 변경할 때는 `/api/og` 템플릿 한 곳만 수정하면 된다.

