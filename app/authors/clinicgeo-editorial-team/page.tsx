import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import {
  buildClinicGeoEditorialTeamJsonLd,
  clinicGeoEditorialTeam,
} from "@/lib/authors";
import {
  buildMetadata,
  publisherName,
  siteUrl,
  summitfeedOrganizationId,
  summitfeedUrl,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  clinicGeoEditorialTeam.pathname,
  clinicGeoEditorialTeam.name,
  clinicGeoEditorialTeam.description,
);

const responsibilities = [
  {
    title: "작성 범위",
    description:
      "병원 GEO, 검색엔진 최적화, AI 인용 구조, 홈페이지 정보 설계와 병원 마케팅 운영 기준을 다룹니다.",
  },
  {
    title: "근거 원칙",
    description:
      "검색엔진·AI 플랫폼 공식 문서와 누구나 다시 확인할 수 있는 공개 자료를 우선하고, 확인일과 한계를 함께 표시합니다.",
  },
  {
    title: "검토 한계",
    description:
      "의료인의 진단이나 진료 조언을 제공하지 않습니다. 의료 내용의 전문 검토자가 별도로 참여한 경우에만 해당 사실을 명시합니다.",
  },
];

export default function ClinicGeoEditorialTeamPage() {
  const canonicalUrl = clinicGeoEditorialTeam.url;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${canonicalUrl}#profile-page`,
      url: canonicalUrl,
      name: clinicGeoEditorialTeam.name,
      description: clinicGeoEditorialTeam.description,
      inLanguage: "ko-KR",
      mainEntity: buildClinicGeoEditorialTeamJsonLd(),
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": summitfeedOrganizationId },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
        { "@type": "ListItem", position: 2, name: clinicGeoEditorialTeam.name, item: canonicalUrl },
      ],
    },
  ];

  return (
    <PageFrame>
      <JsonLd jsonLd={jsonLd} />
      <main>
        <PageIntro
          eyebrow="작성자 프로필"
          title={clinicGeoEditorialTeam.name}
          description={clinicGeoEditorialTeam.description}
        />

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
          <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-3">
            {responsibilities.map((item) => (
              <article key={item.title} className="bg-white p-6">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>

          <section className="mt-10 rounded-lg border border-blue-200 bg-slate-50 p-7">
            <h2 className="text-xl font-bold text-slate-900">운영 및 발행 주체</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Clinic GEO의 운영사와 콘텐츠 발행 주체는 {publisherName}입니다. 편집팀은 운영사의 병의원 GEO
              실무 범위 안에서 콘텐츠를 작성하고 갱신합니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
              <a
                href={summitfeedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline underline-offset-4"
              >
                SUMMITFEED 공식 사이트
              </a>
              <Link href="/editorial-policy" className="text-blue-700 underline underline-offset-4">
                편집·선정 기준
              </Link>
              <Link href="/correction-request" className="text-blue-700 underline underline-offset-4">
                정정 요청
              </Link>
            </div>
          </section>
        </section>
      </main>
    </PageFrame>
  );
}

