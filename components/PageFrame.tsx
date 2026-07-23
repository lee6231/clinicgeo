import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

type PageFrameProps = {
  children: ReactNode;
  tone?: "white" | "soft";
};

export function PageFrame({ children, tone = "soft" }: PageFrameProps) {
  return (
    <div className={`min-h-screen text-slate-950 ${tone === "white" ? "bg-white" : "bg-[#f8faf9]"}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-18">
        <p className="text-sm font-bold text-teal-800">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl break-keep text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
