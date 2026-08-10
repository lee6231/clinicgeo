import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame } from "@/components/PageFrame";
import { getPublishedHospitalEntities } from "@/lib/hospitals";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/hospitals",
  "진료과별 병원 찾기",
  "정형외과, 피부과, 치과, 성형외과, 내과의 병원 기본 정보와 진료 정보, 관련 GEO 아티클을 확인합니다.",
);

const specialties = [
  { slug: "orthopedics-geo", name: "정형외과", number: "01", description: "척추·관절·통증 진료와 의료진 정보를 확인합니다." },
  { slug: "dermatology-geo", name: "피부과", number: "02", description: "피부 질환과 미용 진료의 상담·장비 정보를 살펴봅니다." },
  { slug: "dental-geo", name: "치과", number: "03", description: "임플란트·교정·보존 진료와 진단 정보를 확인합니다." },
  { slug: "plastic-surgery-geo", name: "성형외과", number: "04", description: "진료 분야와 상담·수술·사후 관리 정보를 확인합니다." },
  { slug: "internal-medicine-geo", name: "내과", number: "05", description: "건강검진과 만성질환, 세부 진료 정보를 살펴봅니다." },
];

export default function HospitalsPage() {
  const hospitals = getPublishedHospitalEntities();

  return (
    <PageFrame tone="white">
      <JsonLd jsonLd={[{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "진료과별 병원 찾기",
        description: "병원별 공식 정보와 관련 콘텐츠를 연결한 Clinic GEO 병원 정보 목록",
        url: `${siteUrl}/hospitals`,
      }]} />
      <main>
        <section className="border-b border-blue-100 bg-[#f4f8ff]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
            <p className="text-xs font-bold text-teal-700">HOSPITAL DIRECTORY</p>
            <h1 className="mt-4 break-keep text-4xl font-bold text-[#17365d] sm:text-5xl">진료과별 병원 정보</h1>
            <p className="mt-5 max-w-3xl break-keep text-base leading-8 text-slate-600 sm:text-lg">
              병원명만 나열하지 않습니다. 병원별 기본 정보, 진료 범위, 이용 정보와 관련 GEO 아티클을 하나의 상세 페이지에 연결합니다.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <h2 className="text-2xl font-bold text-[#17365d]">진료과 선택</h2>
          <div className="mt-7 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-5">
            {specialties.map((specialty) => (
              <Link key={specialty.slug} href={`/category/${specialty.slug}`} className="min-h-52 border-b border-r border-blue-100 p-5 transition hover:bg-blue-50">
                <span className="text-xs font-bold text-teal-700">{specialty.number}</span>
                <h3 className="mt-9 text-xl font-bold">{specialty.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{specialty.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-blue-100 bg-[#f7faff]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold text-[#b56728]">VERIFIED ENTITIES</p>
                <h2 className="mt-3 text-3xl font-bold text-[#17365d]">확인된 병원 정보</h2>
              </div>
              <p className="text-sm text-slate-500">공식 출처 확인 후 순차 공개</p>
            </div>
            {hospitals.length > 0 ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {hospitals.map((hospital) => (
                  <Link key={hospital.slug} href={`/hospitals/${hospital.slug}`} className="border border-slate-200 bg-white p-6 hover:border-teal-600">
                    <p className="text-xs font-bold text-teal-700">{hospital.specialtyName} · {hospital.regionName} {hospital.districtName}</p>
                    <h3 className="mt-3 text-xl font-bold">{hospital.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{hospital.summary}</p>
                    <p className="mt-6 text-xs text-slate-500">정보 확인 {hospital.verifiedAt}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 grid gap-6 border border-slate-200 bg-white p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
                <div>
                  <h3 className="text-lg font-bold">병원별 정보 페이지를 준비하고 있습니다</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">확인되지 않은 업체명을 임의로 게시하지 않습니다. 공식 정보 확인이 끝난 병원부터 진료과별로 공개합니다.</p>
                </div>
                <Link href="/contact" className="w-fit rounded-md bg-[#17365d] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">병원 정보 등록 문의</Link>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-bold text-[#17365d]">병원 상세 페이지에 연결되는 정보</h2>
          <div className="mt-8 grid gap-px bg-slate-200 md:grid-cols-4">
            {["공식 기본 정보", "의료진·진료 범위", "예약·주차·진료 시간", "관련 GEO 아티클"].map((item, index) => (
              <div key={item} className="bg-white p-6">
                <span className="text-xs font-bold text-teal-700">0{index + 1}</span>
                <h3 className="mt-8 font-bold">{item}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
