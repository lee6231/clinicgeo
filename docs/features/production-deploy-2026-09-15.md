# 2026-09-15 Clinic GEO 운영 배포

- 상태: 완료
- 담당: Codex
- 시작일: 2026-09-15
- 운영 도메인: `https://clinicgeo.co.kr`
- Vercel 프로젝트: `clinicgeo-ussy`

## 배포 범위

현재 워크트리의 Clinic GEO 사이트 전체를 Vercel Production에 배포한다. Claude의 디자인 변경과 Codex의 SEO 변경이 함께 포함된다. `.vercelignore` 및 `.gitignore`에 포함된 개발 로그, 임시 파일, 소스 캡처와 의존성은 제외한다.

## 배포 전 게이트

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run seo:audit`
- [x] 운영 도메인과 Vercel 프로젝트 연결 확인

## 배포 후 게이트

- [x] Vercel Production 상태 Ready
- [x] `https://clinicgeo.co.kr` HTTP 200
- [x] 운영 sitemap 기반 SEO 감사 통과
- [x] `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/api/og` 확인
- [x] 문의 API 공개 응답 확인(실제 문의 전송 제외)

## 배포 결과

- Vercel deployment ID: `dpl_8UeuwezZgbLwoUkJzp2SrvQWEgZm`
- Deployment URL: `https://clinicgeo-ussy-dp9ph318n-lee6231s-projects.vercel.app`
- Production alias: `https://clinicgeo.co.kr`
- 상태: Ready
- 이전 Production rollback 지점: `dpl_F7nShKbMuSU8eCpvg78DFos6e67P`

## 검증 결과

- 로컬: sitemap 페이지 26/26, 소셜 이미지 26개, 오류 0건, 경고 0건
- 운영: sitemap 페이지 26/26, 소셜 이미지 26개, 오류 0건, 경고 0건
- 홈페이지: HTTP 200, 제목 `병원 마케팅 서비스와 GEO 인사이트 | Clinic GEO by SUMMITFEED`
- 운영 화면 스모크: 데스크톱·모바일 H1 각 1개, 가로 넘침 0
- `/llms.txt`: HTTP 200 및 최신 안내문 확인
- 문의 API: 실제 메일 전송 없이 빈 입력 검증 400 확인
- Vercel Production 환경변수: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` 등록 상태 확인. 값은 노출하지 않음

## 인계

- 이번 배포는 현재 로컬 워크트리의 Vercel 스냅샷이며 Git 커밋은 생성하지 않았다.
- 문제가 발생하면 Vercel에서 이전 Production deployment `dpl_F7nShKbMuSU8eCpvg78DFos6e67P`로 롤백할 수 있다.
- Search Console 색인 요청과 IndexNow 제출은 이번 운영 배포 범위에 포함하지 않았다.
