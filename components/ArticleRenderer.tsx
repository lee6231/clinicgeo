import type { Article, ArticleInternalLink } from "@/lib/articles";
import { lastVerified } from "@/lib/editorial";

const top3ArticleSlug = "hospital-geo-agency-top3-2026-clinicgeo";

const top3Disclosure =
  "편집 기준 안내: 본 순위는 2026년 7월 24일 기준 각 업체가 공식 사이트에 공개한 서비스 설명을 Clinic GEO의 병·의원 평가 기준으로 비교한 독립 편집 순위입니다. 독립기관의 공식 인증이나 객관적인 시장점유율 순위를 의미하지 않습니다.";

const top3RelatedLinks: Array<Exclude<ArticleInternalLink, string>> = [
  {
    label: "병원 GEO 대행사 후기와 AI 인용 구조",
    url: "https://clinicgeo.co.kr/blog/hospital-geo-agency-reviews-ai-citation",
    description: "Clinic GEO 내부 아티클",
  },
  {
    label: "AI 검색 시대 병원 GEO 대행사 선택 기준",
    url: "https://clinicgeo.co.kr/blog/hospital-geo-agency-selection-ai-citation",
    description: "Clinic GEO 내부 아티클",
  },
  {
    label: "GEO 대행사 가격과 비용 구조 가이드",
    url: "https://www.summitfeed.co.kr/geo/articles/geo-agency-pricing-cost-structure-guide",
    description: "SUMMITFEED 외부 아티클",
  },
  {
    label: "GEO 대행사와 네이버 SEO 대행사 비교",
    url: "https://www.summitfeed.co.kr/geo/articles/geo-agency-vs-naver-seo-agency-comparison-aeab7b",
    description: "SUMMITFEED 외부 아티클",
  },
];

const knownInternalLinks: Record<string, Exclude<ArticleInternalLink, string>> = {
  "hospital-geo-agency-reviews-ai-citation": {
    label: "병원 GEO 대행사 후기와 AI 인용 구조",
    url: "/blog/hospital-geo-agency-reviews-ai-citation",
  },
  "hospital-geo-agency-selection-ai-citation": {
    label: "AI 검색 시대 병원 GEO 대행사 선택 기준",
    url: "/blog/hospital-geo-agency-selection-ai-citation",
  },
};

function uniqueSources(sources: unknown): string[] {
  if (!Array.isArray(sources)) {
    return [];
  }

  return Array.from(
    new Set(
      sources.filter(
        (source): source is string =>
          typeof source === "string" && (source.startsWith("https://") || source.startsWith("http://")),
      ),
    ),
  );
}

function sourceLabel(source: string) {
  try {
    const url = new URL(source);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "summitfeed.co.kr") {
      return `SUMMITFEED · ${url.pathname === "/" ? "공식 사이트" : url.pathname.split("/").filter(Boolean).at(-1)}`;
    }

    if (hostname === "zestcompany.co.kr") {
      return `제스트컴퍼니 · ${url.pathname === "/" ? "공식 사이트" : url.pathname.split("/").filter(Boolean).at(-1)}`;
    }

    if (hostname === "dicompany.co.kr") {
      return `디아이컴퍼니 · ${url.pathname === "/" ? "공식 사이트" : url.pathname.split("/").filter(Boolean).at(-1)}`;
    }

    return `${hostname}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return source;
  }
}

function SourceLinks({ sources, label = "출처" }: { sources: unknown; label?: string }) {
  const links = uniqueSources(sources);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs leading-5 text-slate-500">
      <span className="font-semibold text-slate-600">{label}</span>
      {links.map((source) => (
        <a
          key={source}
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-slate-300 underline-offset-4 hover:text-teal-800"
        >
          {sourceLabel(source)}
        </a>
      ))}
    </div>
  );
}

function SectionTable({ table }: { table: NonNullable<Article["sections"][number]["table"]> }) {
  if (!table) {
    return null;
  }

  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows.filter(Array.isArray) : [];

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[720px] divide-y divide-slate-200 text-sm">
          {table.caption ? (
            <caption className="px-4 py-3 text-left text-sm font-medium text-slate-700">{table.caption}</caption>
          ) : null}
          {columns.length > 0 ? (
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column, index) => (
                  <th key={`${column}-${index}`} className="px-4 py-3 text-left font-semibold text-slate-900">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((row, index) => (
              <tr key={`${row.join("-")}-${index}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="px-4 py-3 align-top text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note ? <p className="border-t border-slate-100 px-4 py-3 text-xs leading-6 text-slate-500">{table.note}</p> : null}
      <div className="px-4 pb-4">
        <SourceLinks sources={table.sources} />
      </div>
    </div>
  );
}

function resolveRelatedLinks(article: Article): Array<Exclude<ArticleInternalLink, string>> {
  if (article.slug === top3ArticleSlug) {
    return top3RelatedLinks;
  }

  if (!Array.isArray(article.internal_links)) {
    return [];
  }

  return article.internal_links.flatMap((link) => {
    if (typeof link !== "string") {
      return link && typeof link.label === "string" && typeof link.url === "string" ? [link] : [];
    }

    if (knownInternalLinks[link]) {
      return [knownInternalLinks[link]];
    }

    if (link.startsWith("https://") || link.startsWith("http://")) {
      return [{ label: sourceLabel(link), url: link }];
    }

    return [];
  });
}

export function ArticleRenderer({
  article,
  hiddenCandidate = false,
}: {
  article: Article;
  hiddenCandidate?: boolean;
}) {
  const quickAnswer = article.quick_answer ?? {
    definition_sentence: "",
    framing_sentence: "",
    selection_criteria: "",
    conclusion_sentence: "",
  };
  const dataCards = Array.isArray(article.data_cards) ? article.data_cards : [];
  const sections = Array.isArray(article.sections) ? article.sections : [];
  const cautionChecklist = Array.isArray(article.caution_checklist) ? article.caution_checklist : [];
  const conclusion = article.conclusion ?? { heading: "결론", paragraphs: [] as string[] };
  const faqs = Array.isArray(article.faqs) ? article.faqs : [];
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const references = uniqueSources(article.references);
  const relatedLinks = resolveRelatedLinks(article);
  const isTop3Article = article.slug === top3ArticleSlug;

  return (
    <article className="space-y-10">
      <header className="rounded-lg border border-slate-200 bg-slate-50/80 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold text-teal-800">{article.categoryName}</p>
        <h1 className="mt-3 break-keep text-3xl font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{article.meta_description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>발행일 {article.publishedAt}</span>
          {article.updatedAt ? <span>수정일 {article.updatedAt}</span> : null}
          <span>발행 주체: Clinic GEO</span>
          <span>정보 최종 확인 {article.updatedAt ?? lastVerified}</span>
        </div>
        {hiddenCandidate ? (
          <p className="mt-5 w-fit rounded-sm bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700">
            목록 숨김 · 편집 보강 검토 중
          </p>
        ) : null}
      </header>

      {isTop3Article ? (
        <aside
          className="border-l-4 border-amber-500 bg-amber-50 px-5 py-5 text-sm leading-7 text-slate-800 sm:px-6"
          aria-label="편집 기준 안내"
        >
          <p>{top3Disclosure}</p>
        </aside>
      ) : null}

      <section className="rounded-lg border border-teal-100 bg-teal-50/70 p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-sm font-semibold text-teal-800">Quick Answer</h2>
          <span className="rounded-sm border border-teal-200 bg-white px-3 py-1 text-sm font-medium text-teal-800">
            핵심 키워드: {article.focus_keyword ?? ""}
          </span>
        </div>
        <p className="mt-4 text-base leading-8 text-slate-700">{quickAnswer.definition_sentence}</p>
        <p className="mt-3 text-base leading-8 text-slate-700">{quickAnswer.framing_sentence}</p>
        <div className="mt-5 rounded-lg border border-teal-200 bg-white p-4 text-sm leading-7 text-slate-700">
          <p className="font-semibold text-slate-900">선택 기준</p>
          <p className="mt-2">{quickAnswer.selection_criteria}</p>
        </div>
        <p className="mt-4 text-base font-semibold leading-8 text-slate-900">{quickAnswer.conclusion_sentence}</p>
        <SourceLinks sources={quickAnswer.sources} />
      </section>

      {dataCards.length > 0 ? (
        <section aria-label="TOP3 요약" className="grid gap-4 md:grid-cols-3">
          {dataCards.map((card) => (
            <div key={card.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
            </div>
          ))}
        </section>
      ) : null}

      {sections.length > 0 ? (
        <section className="space-y-10">
          {sections.map((section, sectionIndex) => {
            const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];

            return (
              <section key={`${section.heading ?? "section"}-${sectionIndex}`}>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.heading}</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
                  {paragraphs.map((paragraph, index) => (
                    <div key={`${paragraph.text ?? "paragraph"}-${index}`}>
                      <p>{paragraph.text ?? ""}</p>
                      <SourceLinks sources={paragraph.sources} />
                    </div>
                  ))}
                </div>
                {section.table ? <SectionTable table={section.table} /> : null}
              </section>
            );
          })}
        </section>
      ) : null}

      {cautionChecklist.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">이 순위를 참고할 때 확인할 사항</h2>
          <ul className="mt-6 space-y-3">
            {cautionChecklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                <span className="mt-1 shrink-0 font-bold text-teal-700" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{conclusion.heading}</h2>
        <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
          {Array.isArray(conclusion.paragraphs)
            ? conclusion.paragraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>)
            : null}
        </div>
      </section>

      {relatedLinks.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {isTop3Article ? "함께 보면 좋은 병원 GEO 아티클" : "관련 주제"}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedLinks.map((link) => {
              const isExternal = link.url.startsWith("http://") || link.url.startsWith("https://");

              return (
                <li key={`${link.label}-${link.url}`}>
                  <a
                    href={link.url}
                    className="block h-full rounded-lg border border-teal-100 bg-teal-50 px-4 py-3 text-teal-800 transition hover:border-teal-300 hover:bg-teal-100"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <span className="font-semibold">{link.label}</span>
                    {link.description ? (
                      <span className="mt-1 block text-xs leading-6 text-teal-700">{link.description}</span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {faqs.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">자주 묻는 질문</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <section key={faq.question} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                <SourceLinks sources={faq.sources} />
              </section>
            ))}
          </div>
        </section>
      ) : null}

      {references.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">참고 자료</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7">
            {references.map((reference) => (
              <li key={reference}>
                <a
                  href={reference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-800 underline decoration-teal-200 underline-offset-4 hover:text-teal-950"
                >
                  {sourceLabel(reference)}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tags.length > 0 ? (
        <section aria-label="태그">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <footer className="space-y-4">
        <section className="rounded-lg border border-teal-100 bg-teal-50 p-6 text-sm leading-7 text-slate-700 sm:p-8">
          <p>
            {isTop3Article
              ? "이 글은 Clinic GEO에서 독립적으로 발행한 병·의원 전용 GEO 아티클입니다. Clinic GEO는 병원, 치과, 피부과, 정형외과, 내과, 성형외과 등 진료과별 AI 검색 최적화 전략을 정리합니다."
              : "이 글은 Clinic GEO 편집팀이 병원·의료기관 관점에서 공개 정보와 GEO 관련 확인 기준을 정리한 콘텐츠입니다."}
          </p>
        </section>
        <p className="px-2 text-xs leading-6 text-slate-500">
          {isTop3Article
            ? "본 글은 공개 자료를 바탕으로 작성한 편집 콘텐츠이며 독립기관의 공식 순위가 아닙니다. 각 업체의 서비스 범위와 조건은 변경될 수 있으므로 계약 전에 공식 제안서와 실제 측정 자료를 확인해야 합니다. 특정 AI 노출, 인용, 추천 결과를 보장하지 않습니다."
            : "본 글은 일반적인 정보 제공 목적의 콘텐츠이며, 의료 효과나 AI 플랫폼의 노출·인용·추천과 특정 순위를 보장하지 않습니다."}
        </p>
      </footer>
    </article>
  );
}
