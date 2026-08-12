"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "문의 접수에 실패했습니다.");
      setStatus("success");
      setMessage("문의가 접수되었습니다. 확인 후 입력하신 연락처로 답변드리겠습니다.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "문의 접수에 실패했습니다.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative overflow-hidden rounded-[1.75rem] border border-blue-200 bg-[#fbfaf7] shadow-[0_28px_80px_rgba(16,42,67,0.12)]" noValidate>
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#102a43] via-blue-600 to-blue-300" aria-hidden="true" />
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-100/70 blur-3xl" aria-hidden="true" />

      <div className="relative border-b border-blue-100 px-6 py-6 sm:px-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="text-lg font-bold text-[#102a43] sm:text-xl">상담 정보 입력</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">확인에 필요한 기본 정보만 간단히 입력해 주세요.</p>
          </div>
          <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700">4개 항목</span>
        </div>
      </div>

      <div className="relative grid gap-4 px-6 py-6 sm:grid-cols-2 sm:px-8">
        <label className="group grid gap-2 text-sm font-bold text-slate-800">
          <span className="flex items-center gap-2"><span className="font-mono text-[10px] text-blue-500">01</span> 병원명</span>
          <input name="hospital" required maxLength={80} className="h-13 rounded-xl border border-blue-100 bg-[#f3f4f2] px-4 font-normal outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100/70" placeholder="병원명을 입력해 주세요" />
        </label>
        <label className="group grid gap-2 text-sm font-bold text-slate-800">
          <span className="flex items-center gap-2"><span className="font-mono text-[10px] text-blue-500">02</span> 사이트 주소</span>
          <input name="siteUrl" inputMode="url" required maxLength={300} className="h-13 rounded-xl border border-blue-100 bg-[#f3f4f2] px-4 font-normal outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100/70" placeholder="병원 홈페이지 또는 블로그 URL" />
        </label>
        <label className="group grid gap-2 text-sm font-bold text-slate-800">
          <span className="flex items-center gap-2"><span className="font-mono text-[10px] text-blue-500">03</span> 문의 유형</span>
          <select name="type" required defaultValue="" className="h-13 rounded-xl border border-blue-100 bg-[#f3f4f2] px-4 font-normal outline-none transition hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100/70">
            <option value="" disabled>문의 유형을 선택해 주세요</option>
            <option value="GEO">GEO</option>
            <option value="플레이스">플레이스</option>
            <option value="브랜딩 블로그">브랜딩 블로그</option>
            <option value="블로그 상위노출">블로그 상위노출</option>
          </select>
        </label>
        <label className="group grid gap-2 text-sm font-bold text-slate-800">
          <span className="flex items-center gap-2"><span className="font-mono text-[10px] text-blue-500">04</span> 연락처</span>
          <input name="phone" type="tel" required maxLength={30} className="h-13 rounded-xl border border-blue-100 bg-[#f3f4f2] px-4 font-normal outline-none transition placeholder:text-slate-400 hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100/70" placeholder="010-0000-0000" />
        </label>
      </div>
      <label className="hidden" aria-hidden="true">웹사이트<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="relative border-t border-blue-100 bg-[#f3f4f2] px-6 py-5 sm:px-8">
        <label className="flex items-start gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 text-xs leading-5 text-slate-600">
          <input name="consent" type="checkbox" value="agreed" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#35618f]" />
          <span>문의 확인과 답변을 위해 병원명, 사이트 주소, 문의 유형과 연락처를 수집하는 데 동의합니다.</span>
        </label>
        <button type="submit" disabled={status === "sending"} className="mt-4 flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#102a43] to-blue-700 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(16,42,67,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(16,42,67,0.24)] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0">
          {status === "sending" ? "접수 중..." : <>상담 요청 보내기 <span aria-hidden="true">→</span></>}
        </button>
        {message && (
          <p role="status" className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${status === "success" ? "border-teal-200 bg-teal-50 text-teal-900" : "border-red-200 bg-red-50 text-red-800"}`}>
            {message}{status === "error" && <> 직접 문의: <a className="font-bold underline" href="mailto:summit-ai@summitfeed.co.kr">summit-ai@summitfeed.co.kr</a></>}
          </p>
        )}
      </div>
    </form>
  );
}
