import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { getHospitalEntitiesByLocation } from "@/lib/hospitals";
import {
  directorySpecialties,
  getDirectorySpecialty,
  getDistrictBySlug,
  getRegionBySlug,
  regions,
} from "@/lib/regions";
import { buildMetadata, siteUrl } from "@/lib/seo";

type PageParams = Promise<{ slug: string; region: string; district: string }>;

export function generateStaticParams() {
  return directorySpecialties.flatMap((specialty) =>
    regions.flatMap((region) =>
      region.districts.map((district) => ({
        slug: specialty.slug,
        region: region.slug,
        district: district.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug, region: regionSlug, district: districtSlug } = await params;
  const specialty = getDirectorySpecialty(slug);
  const region = getRegionBySlug(regionSlug);
  const district = getDistrictBySlug(regionSlug, districtSlug);
  if (!specialty || !region || !district) {
    return buildMetadata(`/category/${slug}/${regionSlug}/${districtSlug}`, "지역 정보를 찾을 수 없습니다");
  }

  const entities = getHospitalEntitiesByLocation(specialty.slug, region.slug, district.slug);
  const hasRealEntity = entities.some((hospital) => !hospital.isExample);
  const metadata = buildMetadata(
    `/category/${slug}/${regionSlug}/${districtSlug}`,
    `${region.name} ${district.name} ${specialty.name} 병원 정보`,
    `${region.name} ${district.name}의 ${specialty.name} 기본 정보, 진료 범위와 이용 정보를 확인하세요.`,
  );

  return {
    ...metadata,
    robots: hasRealEntity ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function DistrictPage({ params }: { params: PageParams }) {
  const { slug, region: regionSlug, district: districtSlug } = await params;
  const specialty = getDirectorySpecialty(slug);
  const region = getRegionBySlug(regionSlug);
  const district = getDistrictBySlug(regionSlug, districtSlug);
  if (!specialty || !region || !district) notFound();

  const entities = getHospitalEntitiesByLocation(specialty.slug, region.slug, district.slug);
  const path = `/category/${specialty.slug}/${region.slug}/${district.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${region.name} ${district.name} ${specialty.name} 병원 정보`,
      url: `${siteUrl}${path}`,
      itemListElement: entities.filter((hospital) => !hospital.isExample).map((hospital, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: hospital.name,
        url: `${siteUrl}/hospitals/${hospital.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
        { "@type": "ListItem", position: 2, name: specialty.name, item: `${siteUrl}/category/${specialty.slug}` },
        { "@type": "ListItem", position: 3, name: region.name, item: `${siteUrl}/category/${specialty.slug}/${region.slug}` },
        { "@type": "ListItem", position: 4, name: district.name, item: `${siteUrl}${path}` },
      ],
    },
  ];

  return (
    <PageFrame tone="white">
      <JsonLd jsonLd={jsonLd} />
      <main>
        <section className="border-b border-blue-100 bg-[#eff3f6]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="현재 위치">
              <Link href={`/category/${specialty.slug}`} className="hover:text-blue-700">{specialty.name}</Link>
              <span>/</span>
              <Link href={`/category/${specialty.slug}/${region.slug}`} className="hover:text-blue-700">{region.name}</Link>
              <span>/</span>
              <span>{district.name}</span>
            </nav>
            <p className="mt-8 text-xs font-bold text-blue-700">STEP 03 · HOSPITALS</p>
            <h1 className="mt-3 break-keep text-4xl font-bold text-[#102a43] sm:text-5xl">{region.name} {district.name} {specialty.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
              업체별로 확인된 기본 정보와 진료 범위, 이용 정보를 한 곳씩 살펴볼 수 있습니다.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <h2 className="text-2xl font-bold text-[#102a43]">등록된 업체</h2>
            <p className="text-sm text-slate-500">{entities.length}곳</p>
          </div>

          {entities.length > 0 ? (
            <div className="divide-y divide-slate-200 border-b border-slate-200">
              {entities.map((hospital) => (
                <article key={hospital.slug} className="grid gap-8 py-9 lg:grid-cols-[1fr_0.72fr_auto] lg:items-start">
                  <div>
                    <p className="text-xs font-bold text-blue-700">
                      {hospital.isExample ? "예시 업체 · 배포 시 비공개" : `${hospital.specialtyName} · 정보 확인 완료`}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-[#102a43]">{hospital.name}</h3>
                    <p className="mt-4 max-w-2xl break-keep text-sm leading-7 text-slate-600">{hospital.summary}</p>
                  </div>
                  <dl className="text-sm">
                    <div className="border-b border-slate-100 pb-3">
                      <dt className="font-bold text-slate-800">주소</dt>
                      <dd className="mt-1 text-slate-600">{hospital.address}</dd>
                    </div>
                    <div className="pt-3">
                      <dt className="font-bold text-slate-800">대표 진료 정보</dt>
                      <dd className="mt-2 space-y-1 text-slate-600">
                        {hospital.medicalServices.slice(0, 3).map((service) => <span key={service} className="block">{service}</span>)}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/hospitals/${hospital.slug}`}
                    className="w-fit rounded-md bg-[#102a43] px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
                  >
                    상세 정보 보기
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-xl font-bold text-[#102a43]">현재 등록된 병원 정보가 없습니다</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">공식 출처 확인이 끝난 업체부터 한 곳씩 공개합니다.</p>
            </div>
          )}
        </section>

        <section className="border-t border-blue-100 bg-[#eff3f6]">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#102a43]">{region.name} {district.name} 업체 등록 문의</h2>
              <p className="mt-2 text-sm text-slate-600">공식 홈페이지와 확인 자료를 보내주시면 정보성 페이지 등록을 검토합니다.</p>
            </div>
            <Link href="/contact" className="w-fit rounded-md border border-blue-300 bg-white px-5 py-3 text-sm font-bold text-blue-800 hover:bg-blue-50">문의하기</Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
