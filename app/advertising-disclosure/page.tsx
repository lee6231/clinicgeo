import type { Metadata } from "next";
import Link from "next/link";
import { DisclosureNotice } from "@/components/DisclosureNotice";
import { PageFrame, PageIntro } from "@/components/PageFrame";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/advertising-disclosure",
  "광고·제휴 및 이해관계 안내",
  "Clinic GEO의 유료 광고, 제휴, 정보 제공과 이해관계 표시 방식을 안내합니다.",
);

const labels = [
  ["광고", "노출 또는 콘텐츠 제작에 대가가 지급된 경우"],
  ["제휴", "링크·계약 등과 관련해 경제적 이해관계가 있는 경우"],
  ["정보 제공", "병원이나 외부 기관이 자료를 제공했으나 편집·검증 절차를 별도로 거친 경우"],
  ["기타 이해관계", "콘텐츠 대상과 별도의 경제적·사업상 이해관계가 있는 경우"],
];

export default function AdvertisingDisclosurePage() {
  return (
    <PageFrame>
      <main>
        <PageIntro
          eyebrow="투명성 안내"
          title="광고·제휴 및 이해관계 안내"
          description="일반 편집 정보와 광고·제휴를 구분하고, 콘텐츠 대상과 경제적 이해관계가 있을 때 독자가 바로 확인할 수 있도록 표시합니다."
        >
          <DisclosureNotice />
        </PageIntro>
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
          <h2 className="text-3xl font-bold">콘텐츠 라벨 기준</h2>
          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200 bg-white">
            {labels.map(([label, meaning]) => (
              <div key={label} className="grid gap-3 px-5 py-5 sm:grid-cols-[9rem_1fr]">
                <p><span className="rounded-sm bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-800">{label}</span></p>
                <p className="text-sm leading-7 text-slate-600">{meaning}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            <section>
              <h2 className="text-2xl font-bold">독립 운영과 외부 업체 언급</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">
                Clinic GEO는 콘텐츠에서 언급하는 병원·업체·대행사와 별도로 운영됩니다. 외부 업체의 서비스나
                자료를 소개하고 링크하는 것은 운영 관계를 의미하지 않습니다. 광고, 제휴, 원고 지원 또는
                경제적 대가가 있는 경우에는 해당 관계를 콘텐츠에 별도로 표시합니다.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold">광고비와 편집 기준의 분리</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">
                광고·제휴 여부는 편집 기준과 별도 항목으로 표시합니다. 유료 노출이 있더라도 확인되지 않은
                병원 정보, 치료 효과, 서비스 성과나 순위를 만들지 않습니다. 정보 수정은 공식 근거를 확인한
                뒤 반영합니다.
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/correction-request" className="rounded-md bg-teal-800 px-5 py-3 text-sm font-bold text-white hover:bg-teal-900">
              정보·관계 표시 수정 원칙
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
