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
    <form onSubmit={handleSubmit} className="border-t-2 border-[#17365d]" noValidate>
      <div className="grid gap-5 py-6 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          병원·업체명
          <input name="company" required maxLength={80} className="h-12 border border-slate-300 bg-white px-3 font-normal outline-none focus:border-teal-700" placeholder="병원 또는 업체명을 입력해 주세요" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          담당자명
          <input name="name" required maxLength={40} className="h-12 border border-slate-300 bg-white px-3 font-normal outline-none focus:border-teal-700" placeholder="담당자 성함" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          이메일
          <input name="email" type="email" required maxLength={120} className="h-12 border border-slate-300 bg-white px-3 font-normal outline-none focus:border-teal-700" placeholder="reply@example.com" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-800">
          연락처
          <input name="phone" type="tel" maxLength={30} className="h-12 border border-slate-300 bg-white px-3 font-normal outline-none focus:border-teal-700" placeholder="010-0000-0000" />
        </label>
      </div>
      <label className="grid gap-2 border-t border-slate-200 py-6 text-sm font-bold text-slate-800">
        문의 유형
        <select name="type" required className="h-12 border border-slate-300 bg-white px-3 font-normal outline-none focus:border-teal-700">
          <option value="GEO 문의">GEO 문의</option>
          <option value="네이버 SEO 문의">네이버 SEO 문의</option>
          <option value="네이버 브랜딩 블로그">네이버 브랜딩 블로그</option>
          <option value="플레이스 문의">플레이스 문의</option>
        </select>
      </label>
      <label className="grid gap-2 border-t border-slate-200 py-6 text-sm font-bold text-slate-800">
        문의 내용
        <textarea name="content" required maxLength={3000} rows={8} className="resize-y border border-slate-300 bg-white p-3 font-normal leading-7 outline-none focus:border-teal-700" placeholder="필요한 내용을 자세히 남겨 주세요." />
      </label>
      <label className="hidden" aria-hidden="true">웹사이트<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="flex items-start gap-3 border-t border-slate-200 py-5 text-sm leading-6 text-slate-600">
        <input name="consent" type="checkbox" value="agreed" required className="mt-1 h-4 w-4 accent-[#2563eb]" />
        <span>문의 답변을 위해 병원·업체명, 담당자명, 이메일, 연락처를 수집하는 데 동의합니다.</span>
      </label>
      <button type="submit" disabled={status === "sending"} className="min-h-12 w-full rounded-md bg-[#17365d] px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
        {status === "sending" ? "접수 중..." : "문의 접수하기"}
      </button>
      {message && (
        <p role="status" className={`mt-4 border px-4 py-3 text-sm leading-6 ${status === "success" ? "border-teal-200 bg-teal-50 text-teal-900" : "border-red-200 bg-red-50 text-red-800"}`}>
          {message}{status === "error" && <> 직접 문의: <a className="font-bold underline" href="mailto:summit-ai@summitfeed.co.kr">summit-ai@summitfeed.co.kr</a></>}
        </p>
      )}
    </form>
  );
}
