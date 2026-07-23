import type { Article } from "@/lib/articles";
import { lastVerified } from "@/lib/editorial";

function SectionTable({ table }: { table: NonNullable<Article["sections"][number]["table"]> }) {
  if (!table) {
    return null;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        {table.caption ? (
          <caption className="px-4 py-3 text-left text-sm font-medium text-slate-700">{table.caption}</caption>
        ) : null}
        <thead className="bg-slate-50">
          <tr>
            {table.columns?.map((column) => (
              <th key={column} className="px-4 py-3 text-left font-semibold text-slate-900">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {table.rows?.map((row, index) => (
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
      {table.note ? <p className="px-4 py-3 text-xs leading-6 text-slate-500">{table.note}</p> : null}
    </div>
  );
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
  const internalLinks = Array.isArray(article.internal_links) ? article.internal_links : [];

  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-slate-200 bg-slate-50/80 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold text-teal-800">{article.categoryName}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{article.meta_description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>발행일 {article.publishedAt}</span>
          <span>작성 및 편집 Clinic GEO 편집팀</span>
          {article.updatedAt ? <span>수정일 {article.updatedAt}</span> : null}
          <span>정보 최종 확인 {article.updatedAt ?? lastVerified}</span>
        </div>
        {hiddenCandidate ? (
          <p className="mt-5 w-fit rounded-sm bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700">
            목록 숨김 · 편집 보강 검토 중
          </p>
        ) : null}
      </section>

      <section className="rounded-lg border border-teal-100 bg-teal-50/70 p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-teal-800">빠른 결론</p>
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
      </section>

      {dataCards.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-3">
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
          {sections.map((section) => {
            const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
            return (
              <section key={section.heading ?? "section"}>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.heading}</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
                  {paragraphs.map((paragraph, index) => (
                    <p key={`${paragraph.text ?? "paragraph"}-${index}`}>{paragraph.text ?? ""}</p>
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
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">추가로 확인할 체크리스트</h2>
          <ul className="mt-6 space-y-3">
            {cautionChecklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm bg-teal-700" />
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

      {faqs.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">자주 묻는 질문</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {tags.length > 0 ? (
        <section>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {internalLinks.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">관련 주제</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            {internalLinks.map((link) => {
              if (typeof link === "string") {
                return (
                  <li key={link} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    {link}
                  </li>
                );
              }

              return (
                <li key={`${link.label}-${link.url}`}>
                  <a
                    href={link.url}
                    className="block rounded-lg border border-teal-100 bg-teal-50 px-4 py-3 text-teal-800 transition hover:border-teal-300 hover:bg-teal-100"
                    target="_blank"
                    rel="noopener noreferrer"
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

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-sm leading-7 text-slate-600">
        <p>
          이 글은 Clinic GEO 편집팀이 병원·의료기관 관점에서 공개 정보와 GEO 관련 확인 기준을 정리한
          콘텐츠입니다. 의료 효과나 AI 플랫폼의 노출·인용·추천과 특정 순위를 보장하지 않습니다.
        </p>
        <p className="mt-3 text-xs text-slate-500">
          본 글은 일반적인 정보 제공 목적의 콘텐츠이며, 의료·광고 관련 구체적인 법률 판단은 전문가 검토가
          필요할 수 있습니다.
        </p>
      </section>

    </div>
  );
}
