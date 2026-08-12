import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { getArticleBySlug } from "@/lib/articles";
import { getHospitalEntityBySlug, getPublishedHospitalEntities } from "@/lib/hospitals";
import { buildMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return getPublishedHospitalEntities().map((hospital) => ({ slug: hospital.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hospital = getHospitalEntityBySlug(slug);
  if (!hospital) return buildMetadata(`/hospitals/${slug}`, "병원 정보를 찾을 수 없습니다");

  const metadata = buildMetadata(
    `/hospitals/${slug}`,
    `${hospital.name} | ${hospital.specialtyName} 정보`,
    hospital.summary,
  );
  return hospital.isExample
    ? { ...metadata, robots: { index: false, follow: false } }
    : metadata;
}

export default async function HospitalEntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hospital = getHospitalEntityBySlug(slug);
  if (!hospital) notFound();

  const relatedArticles = hospital.relatedArticleSlugs.map(getArticleBySlug).filter((article) => article?.published);
  const categoryPath = `/category/${hospital.specialtySlug}`;
  const regionPath = `${categoryPath}/${hospital.regionSlug}`;
  const districtPath = `${regionPath}/${hospital.districtSlug}`;
  const jsonLd = [
    ...(!hospital.isExample ? [{
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: hospital.name,
      url: `${siteUrl}/hospitals/${hospital.slug}`,
      address: hospital.address,
      telephone: hospital.phone,
      medicalSpecialty: hospital.specialtyName,
      sameAs: hospital.officialWebsite ? [hospital.officialWebsite] : undefined,
    }] : []),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
        { "@type": "ListItem", position: 2, name: hospital.specialtyName, item: `${siteUrl}${categoryPath}` },
        { "@type": "ListItem", position: 3, name: hospital.regionName, item: `${siteUrl}${regionPath}` },
        { "@type": "ListItem", position: 4, name: hospital.districtName, item: `${siteUrl}${districtPath}` },
        { "@type": "ListItem", position: 5, name: hospital.name, item: `${siteUrl}/hospitals/${hospital.slug}` },
      ],
    },
  ];

  return (
    <PageFrame tone="white">
      <JsonLd jsonLd={jsonLd} />
      <main>
        <section className="border-b border-blue-100 bg-[#eff3f6]">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:py-16">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="현재 위치">
              <Link href={categoryPath} className="hover:text-blue-700">{hospital.specialtyName}</Link>
              <span>/</span>
              <Link href={regionPath} className="hover:text-blue-700">{hospital.regionName}</Link>
              <span>/</span>
              <Link href={districtPath} className="hover:text-blue-700">{hospital.districtName}</Link>
            </nav>
            {hospital.isExample && (
              <div className="mt-8 rounded-lg border border-blue-300 bg-white px-5 py-4 text-sm leading-6 text-blue-900">
                <strong className="block">화면 구성을 위한 가상 예시 업체입니다.</strong>
                실제 의료기관이 아니며, 운영 배포 환경에서는 자동으로 비공개 처리됩니다.
              </div>
            )}
            <p className="mt-8 text-sm font-bold text-blue-700">{hospital.specialtyName} · {hospital.regionName} {hospital.districtName}</p>
            <h1 className="mt-4 text-4xl font-bold text-[#102a43] sm:text-5xl">{hospital.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{hospital.summary}</p>
            <p className="mt-4 text-xs text-slate-500">정보 최종 확인 {hospital.verifiedAt}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1fr_0.7fr] lg:py-20">
          <div>
            <h2 className="text-2xl font-bold text-[#102a43]">진료 정보</h2>
            <div className="mt-6 border-t border-slate-200">
              {hospital.medicalServices.map((service) => (
                <p key={service} className="border-b border-slate-200 py-4 text-sm text-slate-700">{service}</p>
              ))}
            </div>

            {hospital.hours && hospital.hours.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-[#102a43]">진료 시간</h2>
                <div className="mt-5 border-t border-slate-200">
                  {hospital.hours.map((hour) => <p key={hour} className="border-b border-slate-200 py-4 text-sm text-slate-700">{hour}</p>)}
                </div>
              </div>
            )}
          </div>

          <aside className="border-t-2 border-[#102a43]">
            <dl className="text-sm">
              <div className="border-b border-slate-200 py-4"><dt className="font-bold">주소</dt><dd className="mt-1 text-slate-600">{hospital.address}</dd></div>
              {hospital.phone && <div className="border-b border-slate-200 py-4"><dt className="font-bold">전화</dt><dd className="mt-1 text-slate-600">{hospital.phone}</dd></div>}
              {hospital.amenities && hospital.amenities.length > 0 && (
                <div className="border-b border-slate-200 py-4">
                  <dt className="font-bold">이용 정보</dt>
                  <dd className="mt-2 space-y-1 text-slate-600">{hospital.amenities.map((item) => <span key={item} className="block">{item}</span>)}</dd>
                </div>
              )}
              {hospital.officialWebsite && <div className="border-b border-slate-200 py-4"><dt className="font-bold">공식 홈페이지</dt><dd className="mt-1"><a href={hospital.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">직접 확인하기</a></dd></div>}
            </dl>
          </aside>
        </section>

        {relatedArticles.length > 0 && (
          <section className="border-y border-blue-100 bg-[#eff3f6]">
            <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
              <h2 className="text-2xl font-bold text-[#102a43]">관련 병원 GEO 아티클</h2>
              <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                {relatedArticles.map((article) => article && <Link key={article.slug} href={`/blog/${article.slug}`} className="block py-5 font-bold hover:text-blue-700">{article.title}</Link>)}
              </div>
            </div>
          </section>
        )}
      </main>
    </PageFrame>
  );
}
