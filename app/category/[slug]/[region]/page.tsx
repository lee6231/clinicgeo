import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { getHospitalEntitiesByLocation } from "@/lib/hospitals";
import { directorySpecialties, getDirectorySpecialty, getRegionBySlug, regions } from "@/lib/regions";
import { buildMetadata, siteUrl } from "@/lib/seo";

type PageParams = Promise<{ slug: string; region: string }>;

export function generateStaticParams() {
  return directorySpecialties.flatMap((specialty) =>
    regions.map((region) => ({ slug: specialty.slug, region: region.slug })),
  );
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug, region: regionSlug } = await params;
  const specialty = getDirectorySpecialty(slug);
  const region = getRegionBySlug(regionSlug);
  if (!specialty || !region) return buildMetadata(`/category/${slug}/${regionSlug}`, "지역 정보를 찾을 수 없습니다");

  return buildMetadata(
    `/category/${slug}/${regionSlug}`,
    `${region.name} ${specialty.name} 병원 정보`,
    `${region.name}의 구·군을 선택해 ${specialty.name} 기본 정보와 진료 범위를 확인하세요.`,
  );
}

export default async function RegionPage({ params }: { params: PageParams }) {
  const { slug, region: regionSlug } = await params;
  const specialty = getDirectorySpecialty(slug);
  const region = getRegionBySlug(regionSlug);
  if (!specialty || !region) notFound();

  const regionEntities = getHospitalEntitiesByLocation(specialty.slug, region.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${region.name} ${specialty.name} 병원 정보`,
      url: `${siteUrl}/category/${specialty.slug}/${region.slug}`,
      itemListElement: region.districts.map((district, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${region.name} ${district.name} ${specialty.name}`,
        url: `${siteUrl}/category/${specialty.slug}/${region.slug}/${district.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
        { "@type": "ListItem", position: 2, name: specialty.name, item: `${siteUrl}/category/${specialty.slug}` },
        { "@type": "ListItem", position: 3, name: region.name, item: `${siteUrl}/category/${specialty.slug}/${region.slug}` },
      ],
    },
  ];

  return (
    <PageFrame tone="white">
      <JsonLd jsonLd={jsonLd} />
      <main>
        <section className="border-b border-blue-100 bg-[#eff3f6]">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
            <nav className="text-sm text-slate-500" aria-label="현재 위치">
              <Link href={`/category/${specialty.slug}`} className="hover:text-blue-700">{specialty.name}</Link>
              <span className="mx-2">/</span>
              <span>{region.name}</span>
            </nav>
            <p className="mt-8 text-xs font-bold text-blue-700">STEP 02 · DISTRICT</p>
            <h1 className="mt-3 text-4xl font-bold text-[#102a43] sm:text-5xl">{region.name} {specialty.name}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
              원하는 구·군을 선택하면 해당 지역에 등록된 병원 정보를 업체별로 확인할 수 있습니다.
            </p>
            <p className="mt-4 text-sm font-semibold text-blue-700">현재 {regionEntities.length}곳 · {region.districts.length}개 지역</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {region.districts.map((district) => {
              const entities = getHospitalEntitiesByLocation(specialty.slug, region.slug, district.slug);
              const hasExample = entities.some((hospital) => hospital.isExample);
              return (
                <Link
                  key={district.slug}
                  href={`/category/${specialty.slug}/${region.slug}/${district.slug}`}
                  className="group min-h-32 rounded-lg border border-blue-100 bg-[#f7f6f2] p-5 transition hover:border-blue-400 hover:bg-blue-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-[#102a43] group-hover:text-blue-700">{district.name}</h2>
                    <span aria-hidden="true" className="text-blue-500">→</span>
                  </div>
                  <p className="mt-8 text-xs font-semibold text-slate-500">
                    {hasExample ? `예시 포함 ${entities.length}곳` : `등록된 업체 ${entities.length}곳`}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t border-blue-100 bg-[#eff3f6]">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#102a43]">병원 정보를 등록하시나요?</h2>
              <p className="mt-2 text-sm text-slate-600">공식 정보와 확인 가능한 출처를 바탕으로 지역별 업체 페이지를 구성합니다.</p>
            </div>
            <Link href="/contact" className="w-fit rounded-md bg-[#102a43] px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">업체 정보 등록 문의</Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
