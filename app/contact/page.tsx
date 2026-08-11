import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageFrame } from "@/components/PageFrame";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "/contact",
  "GEO·네이버 SEO·브랜딩 블로그·플레이스 문의",
  "Clinic GEO에서 GEO, 네이버 SEO, 네이버 브랜딩 블로그와 플레이스 운영 문의를 접수합니다.",
);

export default function ContactPage() {
  return (
    <PageFrame tone="white">
      <main>
        <section className="border-b border-blue-100 bg-[#f4f8ff]">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
            <p className="text-xs font-bold text-teal-700">CONTACT</p>
            <h1 className="mt-4 break-keep text-4xl font-bold text-[#17365d] sm:text-5xl">Clinic GEO 문의하기</h1>
            <p className="mt-5 max-w-3xl break-keep text-base leading-8 text-slate-600 sm:text-lg">GEO, 네이버 SEO, 네이버 브랜딩 블로그와 플레이스 운영에 대해 문의해 주세요.</p>
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[0.62fr_1.38fr] lg:py-20">
          <div>
            <h2 className="text-2xl font-bold text-[#17365d]">문의 안내</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">접수 내용은 SUMMITFEED 담당자가 확인하며, 답변에 필요한 최소 정보만 수집합니다.</p>
            <dl className="mt-8 border-t border-slate-200 text-sm">
              <div className="border-b border-slate-200 py-4"><dt className="font-bold">이메일</dt><dd className="mt-1"><a href="mailto:summit-ai@summitfeed.co.kr" className="text-teal-800 underline">summit-ai@summitfeed.co.kr</a></dd></div>
              <div className="border-b border-slate-200 py-4"><dt className="font-bold">문의 범위</dt><dd className="mt-1 leading-6 text-slate-600">GEO, 네이버 SEO, 네이버 브랜딩 블로그, 플레이스</dd></div>
              <div className="border-b border-slate-200 py-4"><dt className="font-bold">보관 기간</dt><dd className="mt-1 leading-6 text-slate-600">답변 완료 후 1년 이내 파기</dd></div>
            </dl>
          </div>
          <ContactForm />
        </section>
      </main>
    </PageFrame>
  );
}
