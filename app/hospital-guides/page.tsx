import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { hospitalGuides, lastVerified } from "@/lib/editorial";
import { buildMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/hospital-guides",
  "병원 선택 가이드 | 치과·피부과·이용 조건 확인",
  "치과와 피부과를 비롯한 병원 선택 시 공식 홈페이지에서 확인할 정보와 방문 전 체크리스트를 정리합니다.",
);

const guideDetails = {
  dental: [
    "의료진 이름·전문 분야·진료 일정이 공식 페이지에 공개되어 있는가",
    "내가 필요한 검사와 진료 범위가 구체적으로 안내되어 있는가",
    "검사·상담·치료의 순서와 추가 확인 항목을 설명하는가",
    "비급여 항목과 비용 확인 경로가 안내되어 있는가",
    "평일·야간·주말 진료와 접수 마감 시간을 구분했는가",
    "주차, 대중교통, 예약 변경 방법을 확인할 수 있는가",
    "치료 후 문의와 사후 확인 절차가 안내되어 있는가",
  ],
  dermatology: [
    "상담과 시술을 담당하는 의료진 정보를 확인할 수 있는가",
    "시술명만 나열하지 않고 적용 범위와 제한을 설명하는가",
    "장비·제품명보다 사용 목적과 상담 절차를 안내하는가",
    "비용의 포함 범위와 추가 비용 확인 방법이 있는가",
    "부작용·주의사항·회복 과정에 관한 공식 안내가 있는가",
    "시술 후 문의, 예약 변경과 사후 확인 경로가 있는가",
  ],
  general: [
    "공식 홈페이지의 진료 시간과 최근 공지 날짜를 함께 확인했는가",
    "야간·주말 진료의 대상 진료과와 의료진 일정을 확인했는가",
    "진료 종료 시간과 접수 마감 시간을 구분했는가",
    "예약 필수 여부와 당일 접수 가능 여부를 직접 확인했는가",
    "주차 가능 시간과 건물 운영 시간을 함께 확인했는가",
  ],
};

const comparisonFields = [
  ["공식 병원명", "사업자·의료기관의 공식 표기와 일치하는지 확인"],
  ["지역·접근성", "주소, 역·정류장, 주차와 이동 조건을 기록"],
  ["공개 진료 분야", "공식 홈페이지에 표시된 범위만 기재"],
  ["의료진 정보", "의료진 소개와 진료 일정 링크를 확인"],
  ["진료 시간", "요일별 시간과 접수 마감을 구분"],
  ["비급여 정보", "공개 여부와 공식 확인 경로만 표시"],
  ["방문 전 확인", "바뀔 수 있는 예약·진료·주차 조건을 별도 기록"],
];

export default function HospitalGuidesPage() {
  return (
    <PageFrame>
      <JsonLd
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "병원 선택 가이드",
            description: "병원·치과 선택 시 공식 정보로 확인할 기준",
            url: `${siteUrl}/hospital-guides`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "병원 선택 가이드", item: `${siteUrl}/hospital-guides` },
            ],
          },
        ]}
      />
      <main>
        <PageIntro
          eyebrow="병원 선택 가이드"
          title="후기 수보다 공식 정보와 이용 조건을 함께 봅니다"
          description="아래 가이드는 특정 병원을 추천하거나 의료 수준을 평가하는 자료가 아닙니다. 후보를 비교할 때 놓치기 쉬운 공식 정보와 방문 전 확인 항목을 정리합니다."
        />

        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
          <div className="border-l-4 border-teal-700 bg-teal-50 px-5 py-5">
            <p className="font-bold text-teal-950">빠른 결론</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              병원을 선택할 때는 단순 후기 수보다 의료진 정보, 진료 범위, 검사·진료 안내, 진료 시간, 위치와
              사후 안내를 함께 확인해야 합니다. 실제 진료 내용과 비용, 예약 가능 여부는 의료기관에 직접
              확인하세요.
            </p>
          </div>

          <div className="mt-12 space-y-16">
            {hospitalGuides.map((guide) => (
              <section key={guide.id} id={guide.id} className="scroll-mt-24 border-t border-slate-200 pt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-sm bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800">{guide.specialty}</span>
                  <span className="text-xs font-semibold text-slate-500">정보 최종 확인 {lastVerified}</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold">{guide.title}</h2>
                <p className="mt-3 text-base leading-8 text-slate-600">{guide.summary}</p>
                <ol className="mt-7 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
                  {guideDetails[guide.id as keyof typeof guideDetails].map((item, index) => (
                    <li key={item} className="flex gap-4 bg-white p-5 text-sm leading-7 text-slate-700">
                      <span className="font-bold text-teal-800">{String(index + 1).padStart(2, "0")}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
            <h2 className="text-3xl font-bold">조건별 후보 비교표에 기록할 항목</h2>
            <div className="mt-7 overflow-x-auto border border-slate-200">
              <table className="min-w-[680px] w-full border-collapse text-sm">
                <caption className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                  실제 병원 후보를 비교할 때 사용할 공식 정보 확인 항목
                </caption>
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">항목</th>
                    <th className="px-4 py-3 text-left">기록 원칙</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {comparisonFields.map(([field, rule]) => (
                    <tr key={field}>
                      <th scope="row" className="w-48 bg-slate-50 px-4 py-3 text-left font-bold text-slate-900">{field}</th>
                      <td className="px-4 py-3 leading-6 text-slate-600">{rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </PageFrame>
  );
}
