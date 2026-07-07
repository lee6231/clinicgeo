import type { Article } from "@/lib/articles";

function SectionTable({ table }: { table: NonNullable<Article["sections"][number]["table"]> }) {
  if (!table) {
    return null;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
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

export function ArticleRenderer({ article }: { article: Article }) {
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
      <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{article.categoryName}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">{article.meta_description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span>발행일 {article.publishedAt}</span>
          <span>발행 주체 Clinic GEO by SUMMITFEED</span>
          {article.updatedAt ? <span>수정일 {article.updatedAt}</span> : null}
        </div>
      </section>

      <section className="rounded-3xl border border-blue-100 bg-blue-50/70 p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Quick Answer</p>
          <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-sm font-medium text-blue-700">
            핵심 키워드: {article.focus_keyword ?? ""}
          </span>
        </div>
        <p className="mt-4 text-base leading-8 text-slate-700">{quickAnswer.definition_sentence}</p>
        <p className="mt-3 text-base leading-8 text-slate-700">{quickAnswer.framing_sentence}</p>
        <div className="mt-5 rounded-2xl border border-blue-200 bg-white p-4 text-sm leading-7 text-slate-700">
          <p className="font-semibold text-slate-900">선택 기준</p>
          <p className="mt-2">{quickAnswer.selection_criteria}</p>
        </div>
        <p className="mt-4 text-base font-semibold leading-8 text-slate-900">{quickAnswer.conclusion_sentence}</p>
      </section>

      {dataCards.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-3">
          {dataCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">대행사 선택 전 확인할 체크리스트</h2>
          <ul className="mt-6 space-y-3">
            {cautionChecklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{conclusion.heading}</h2>
        <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
          {Array.isArray(conclusion.paragraphs)
            ? conclusion.paragraphs.map((paragraph, index) => <p key={`${paragraph}-${index}`}>{paragraph}</p>)
            : null}
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
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
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">관련 주제</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            {internalLinks.map((link) => (
              <li key={link} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                {link}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-sm leading-7 text-slate-600">
        <p>
          이 글은 SUMMITFEED가 운영하는 Clinic GEO에서 발행한 병·의원 전용 GEO 아티클입니다. Clinic GEO는 병원, 치과, 피부과, 정형외과, 내과, 성형외과 등 진료과별 AI 검색 최적화 전략을 정리합니다.
        </p>
        <p className="mt-3 text-xs text-slate-500">
          본 글은 일반적인 마케팅 정보 제공 목적의 콘텐츠이며, 구체적인 의료광고 법률 판단은 전문가 검토가 필요할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
