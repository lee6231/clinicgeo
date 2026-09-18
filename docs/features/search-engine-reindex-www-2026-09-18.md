# www 404 점검·Google/Bing 전체 재제출

- 상태: 완료
- 담당: Codex
- 확인일: 2026-09-18
- canonical origin: `https://clinicgeo.co.kr`
- 리디렉션 origin: `https://www.clinicgeo.co.kr`

## 원인 판정

현재 운영 환경에서는 `www.clinicgeo.co.kr` 404가 재현되지 않았다. Vercel에서 기본 도메인과 www 도메인이 모두 `clinicgeo-ussy` 프로젝트에 연결되어 있고, www 요청은 같은 경로의 기본 도메인으로 HTTP 308 영구 이동한다.

www는 별도 색인 대상이 아니라 기본 도메인으로 통합하는 리디렉션 호스트다. canonical, sitemap, robots.txt, JSON-LD는 기본 도메인을 정본으로 유지한다.

## 검증

- Vercel 도메인 연결: `clinicgeo.co.kr`, `www.clinicgeo.co.kr` 모두 확인
- 운영 사이트맵 URL 수: 20개
- 기본 도메인 20개: 모두 HTTP 200
- 대응하는 www 20개: 모두 HTTP 308, 동일 경로 기본 도메인으로 이동
- www 리디렉션 추적 후 최종 응답: 20개 모두 HTTP 200
- `npm run seo:audit -- https://clinicgeo.co.kr`: 20/20, 오류 0, 경고 0
- IndexNow 검증 파일: 운영 HTTP 200

## 재제출 결과

- Bing/IndexNow: 사이트맵의 canonical URL 20개 일괄 제출, HTTP 200 OK
- Google Search Console: `https://clinicgeo.co.kr/sitemap.xml` 재제출, HTTP 204
- Google URL Inspection 전수 확인:
  - 18개: `PASS` / `제출되고 색인이 생성되었습니다.`
  - 2개: `NEUTRAL` / `발견됨 - 현재 색인이 생성되지 않음`

현재 미색인 2개 URL:

- `https://clinicgeo.co.kr/authors/clinicgeo-editorial-team`
- `https://clinicgeo.co.kr/category/hospital-geo`

두 URL도 사이트맵과 IndexNow 제출 대상에 포함됐다. Search Console 화면의 개별 `색인 생성 요청`은 Windows 브라우저 URL을 안전하게 확인하지 못해 자동 제어가 중단되어 실행하지 않았다. 실제 재크롤링과 색인 반영 시점은 Google과 Bing이 결정한다.

## 완료 조건과 인계

- [x] www 404 전수 재검증
- [x] canonical 리디렉션 일치 확인
- [x] Google 사이트맵 재제출
- [x] Bing IndexNow 전체 URL 재제출
- [x] Google 현재 색인 상태 전수 확인

추가 코드 수정이나 재배포는 필요하지 않았다. 이후 2개 미색인 URL의 상태만 Search Console에서 재확인한다.
