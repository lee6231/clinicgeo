export const lastVerified = "2026-07-23";

export const navigation = [
  { href: "/", label: "홈" },
  { href: "/hospitals", label: "병원·치과 찾기" },
  { href: "/hospital-guides", label: "병원 선택 가이드" },
  { href: "/geo-resources", label: "GEO 자료실" },
  { href: "/blog", label: "전체 콘텐츠" },
  { href: "/editorial-policy", label: "편집 기준" },
];

export const quickPaths = [
  {
    href: "/hospitals",
    label: "병원·치과 후보",
    description: "지역, 진료 분야, 이용 조건을 먼저 정리합니다.",
    marker: "01",
  },
  {
    href: "/hospital-guides#dental",
    label: "치과 선택 기준",
    description: "의료진, 진료 범위, 비용 안내를 확인합니다.",
    marker: "02",
  },
  {
    href: "/hospital-guides#dermatology",
    label: "피부과 선택 기준",
    description: "시술명보다 상담·안내·사후 확인 범위를 봅니다.",
    marker: "03",
  },
  {
    href: "/hospital-guides#general",
    label: "야간·주말 진료 확인",
    description: "진료 시간과 접수 마감을 다시 확인합니다.",
    marker: "04",
  },
  {
    href: "/geo-resources",
    label: "GEO 공식 자료",
    description: "검색엔진과 AI 플랫폼의 원문 안내를 모았습니다.",
    marker: "05",
  },
  {
    href: "/editorial-policy",
    label: "편집·선정 기준",
    description: "정보를 확인하고 표시하는 원칙을 공개합니다.",
    marker: "06",
  },
];

export const hospitalGuides = [
  {
    id: "dental",
    specialty: "치과",
    title: "치과 선택 전 확인할 7가지",
    summary: "의료진 정보, 진료 범위, 검사 안내, 비급여 공개, 진료 시간, 위치, 사후 안내를 차례로 확인합니다.",
    criteriaCount: 7,
    linkLabel: "치과 선택 기준 확인하기",
  },
  {
    id: "dermatology",
    specialty: "피부과",
    title: "피부과 선택 시 비교할 6가지",
    summary: "시술 효과를 단정하는 광고보다 상담 주체, 사용 장비 안내, 비용 범위, 부작용 안내와 사후 확인 절차를 봅니다.",
    criteriaCount: 6,
    linkLabel: "피부과 비교 항목 살펴보기",
  },
  {
    id: "general",
    specialty: "공통",
    title: "야간·주말 진료 병원 확인 방법",
    summary: "포털 표기만 믿기보다 공식 홈페이지와 전화로 당일 진료, 접수 마감, 주차와 예약 방식을 다시 확인합니다.",
    criteriaCount: 5,
    linkLabel: "병원 이용 조건 확인하기",
  },
];

export const exploreGroups = [
  {
    title: "지역",
    description: "생활권과 이동 시간을 기준으로 후보 범위를 정합니다.",
    items: ["강남", "서초", "송파", "분당", "대전", "부산"],
    href: "/hospitals#region",
  },
  {
    title: "진료 분야",
    description: "진료 분야별 선택 기준부터 확인합니다.",
    items: ["치과", "피부과", "정형외과", "한방병원", "안과"],
    href: "/hospital-guides",
  },
  {
    title: "이용 조건",
    description: "방문 가능성과 정보 공개 범위를 함께 봅니다.",
    items: ["야간 진료", "주말 진료", "주차", "역세권", "예약 방식", "비급여 정보"],
    href: "/hospital-guides#general",
  },
];

export type Resource = {
  category: string;
  title: string;
  source: string;
  type: "공식 자료";
  summary: string;
  reason: string;
  url: string;
};

export const resources: Resource[] = [
  {
    category: "검색·크롤링",
    title: "robots.txt 설정 가이드",
    source: "네이버 서치어드바이저",
    type: "공식 자료",
    summary: "네이버 검색 로봇의 접근 허용과 차단, sitemap 위치 표기를 설명합니다.",
    reason: "병원 홈페이지의 공개 페이지가 검색 로봇에 열려 있는지 점검할 때 필요합니다.",
    url: "https://searchadvisor.naver.com/guide/seo-basic-robots",
  },
  {
    category: "검색·크롤링",
    title: "사이트맵 만들기와 제출",
    source: "Google Search Central",
    type: "공식 자료",
    summary: "검색에 포함하려는 canonical URL을 사이트맵으로 제공하는 기본 원칙을 설명합니다.",
    reason: "새 가이드와 병원 정보 페이지가 검색엔진에 발견될 경로를 확인할 때 사용합니다.",
    url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap",
  },
  {
    category: "검색·크롤링",
    title: "canonical URL 지정 방법",
    source: "Google Search Central",
    type: "공식 자료",
    summary: "중복되거나 유사한 URL 가운데 대표 URL을 알리는 방법과 신호 강도를 정리합니다.",
    reason: "외부 대행사 사이트와 Clinic GEO의 콘텐츠 역할 및 canonical을 분리할 때 기준이 됩니다.",
    url: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls",
  },
  {
    category: "구조화 데이터",
    title: "구조화 데이터 입문",
    source: "Google Search Central",
    type: "공식 자료",
    summary: "페이지 내용을 검색엔진이 이해할 수 있도록 JSON-LD 등으로 설명하는 기본 원칙을 다룹니다.",
    reason: "화면에 보이는 정보만 정확히 구조화하고 과장된 평점·리뷰 스키마를 피하는 기준입니다.",
    url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data",
  },
  {
    category: "구조화 데이터",
    title: "Schema.org 문서",
    source: "Schema.org",
    type: "공식 자료",
    summary: "WebSite, Article, BreadcrumbList 등 구조화 데이터 타입과 속성의 원본 어휘를 제공합니다.",
    reason: "페이지 성격에 맞는 타입을 고르고 확인되지 않은 속성을 만들지 않기 위해 참고합니다.",
    url: "https://schema.org/docs/documents.html",
  },
  {
    category: "AI 크롤링",
    title: "퍼블리셔·개발자 FAQ",
    source: "OpenAI",
    type: "공식 자료",
    summary: "OAI-SearchBot과 GPTBot의 역할, robots.txt 설정과 ChatGPT 유입 확인에 관한 안내입니다.",
    reason: "AI 검색 노출과 모델 학습 제어를 같은 설정으로 오해하지 않도록 구분할 때 필요합니다.",
    url: "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq",
  },
  {
    category: "AI 크롤링",
    title: "PerplexityBot과 robots.txt",
    source: "Perplexity",
    type: "공식 자료",
    summary: "PerplexityBot이 robots.txt의 허용·차단 규칙을 어떻게 따르는지 설명합니다.",
    reason: "Perplexity 검색 노출을 점검할 때 서버 차단과 robots 설정을 분리해 확인하는 출발점입니다.",
    url: "https://www.perplexity.ai/help-center/en/articles/10354969-how-does-perplexity-follow-robots-txt",
  },
];

export const hiddenArticleSlugs = new Set([
  "hospital-geo-agency-reviews-ai-citation",
  "hospital-geo-agency-selection-ai-citation",
]);

export function isArticleListed(slug: string) {
  return !hiddenArticleSlugs.has(slug);
}
