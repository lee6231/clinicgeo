import type { Article, ArticleReference, ArticleRichBlock } from "@/lib/articles";
import { lastVerified } from "@/lib/editorial";
import { articlePublisherLabel } from "@/lib/seo";

const top3ArticleSlug = "hospital-geo-agency-top3-2026-clinicgeo";

type ResolvedArticleLink = {
  label: string;
  url: string;
  description?: string;
};

const top3RelatedLinks: ResolvedArticleLink[] = [
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
    description: "써밋피드(SUMMITFEED) 외부 아티클",
  },
  {
    label: "GEO 대행사와 네이버 SEO 대행사 비교",
    url: "https://www.summitfeed.co.kr/geo/articles/geo-agency-vs-naver-seo-agency-comparison-aeab7b",
    description: "써밋피드(SUMMITFEED) 외부 아티클",
  },
];

const knownInternalLinks: Record<string, ResolvedArticleLink> = {
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
      return `써밋피드(SUMMITFEED) · ${url.pathname === "/" ? "공식 사이트" : url.pathname.split("/").filter(Boolean).at(-1)}`;
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
          className="break-all underline decoration-slate-300 underline-offset-4 hover:text-teal-800"
        >
          {sourceLabel(source)}
        </a>
      ))}
    </div>
  );
}

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

        if (!match) {
          return <span key={`${part}-${index}`}>{part}</span>;
        }

        return (
          <a
            key={`${match[2]}-${index}`}
            href={match[2]}
            className="font-medium text-teal-800 underline decoration-teal-200 underline-offset-4 hover:text-teal-950"
          >
            {match[1]}
          </a>
        );
      })}
    </>
  );
}

function resolveReferences(references: ArticleReference[] | undefined) {
  if (!Array.isArray(references)) {
    return [];
  }

  const seen = new Set<string>();

  return references.flatMap((reference) => {
    const item =
      typeof reference === "string"
        ? { title: sourceLabel(reference), url: reference }
        : reference && typeof reference.title === "string" && typeof reference.url === "string"
          ? reference
          : null;

    if (!item || seen.has(item.url)) {
      return [];
    }

    seen.add(item.url);
    return [item];
  });
}

function SectionTable({
  table,
  editorial = false,
}: {
  table: NonNullable<Article["sections"][number]["table"]>;
  editorial?: boolean;
}) {
  if (!table) {
    return null;
  }

  const columns = Array.isArray(table.columns) ? table.columns : [];
  const rows = Array.isArray(table.rows) ? table.rows.filter(Array.isArray) : [];
  const isRankTable = columns[0] === "순위";
  const isSituationTable = columns[0] === "현재 필요한 것";
  const columnClassName = (index: number) => {
    if (isRankTable) {
      return [
        "w-[9%] whitespace-nowrap text-center",
        "w-[22%] whitespace-nowrap",
        "w-[34.5%]",
        "w-[34.5%]",
      ][index] ?? "";
    }

    if (isSituationTable) {
      return ["w-[37%]", "w-[23%] whitespace-nowrap", "w-[40%]"][index] ?? "";
    }

    return "";
  };

  return (
    <div
      className={
        editorial
          ? "my-[26px] min-w-0 max-w-full overflow-hidden rounded-[14px] border border-[#dde6e7] bg-white"
          : "mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white"
      }
    >
      <div className="w-full max-w-full overflow-x-auto">
        <table
          className={
            editorial
              ? "min-w-[680px] table-fixed border-collapse text-[15px]"
              : "min-w-[920px] table-fixed divide-y divide-slate-200 text-sm"
          }
        >
          {table.caption ? (
            <caption className="px-4 py-3 text-left text-sm font-medium text-slate-700">{table.caption}</caption>
          ) : null}
          {columns.length > 0 ? (
            <thead className={editorial ? "bg-[#f0f5f5] text-[#0e1c26]" : "bg-slate-50"}>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={`${column}-${index}`}
                    className={`break-keep px-4 py-3.5 font-semibold ${editorial ? "border-b-2 border-[#dde6e7] text-[#0e1c26]" : "text-slate-900"} ${index === 0 && isRankTable ? "text-center" : "text-left"} ${columnClassName(index)}`}
                  >
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
                  <td
                    key={`${cell}-${cellIndex}`}
                    className={`break-keep px-4 py-3.5 align-top ${editorial ? "border-b border-[#eef3f3] text-[15px] leading-7 text-[#33505f]" : "leading-6 text-slate-700"} ${cellIndex === 0 && isRankTable ? "text-center font-semibold" : "text-left"} ${columnClassName(cellIndex)}`}
                  >
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

function RichArticleBlock({ block, editorial = false }: { block: ArticleRichBlock; editorial?: boolean }) {
  if (block.type === "h3") {
    return block.text ? (
      <h3
        className={
          editorial
            ? "pt-4 text-[19.5px] font-bold tracking-[-0.015em] text-[#0e1c26]"
            : "pt-2 text-xl font-semibold tracking-tight text-slate-900"
        }
      >
        {block.text}
      </h3>
    ) : null;
  }

  if (block.type === "table") {
    return (
      <SectionTable
        editorial={editorial}
        table={{
          columns: Array.isArray(block.headers) ? block.headers : [],
          rows: Array.isArray(block.rows) ? block.rows : [],
        }}
      />
    );
  }

  if (block.type === "ul") {
    const items = Array.isArray(block.items) ? block.items.filter((item): item is string => typeof item === "string") : [];

    return items.length > 0 ? (
      <ul className={editorial ? "my-7 border-y border-slate-200" : "my-6 space-y-3"}>
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className={
              editorial
                ? "grid gap-3 border-b border-slate-200 py-4 last:border-b-0 sm:grid-cols-[2rem_1fr]"
                : "flex gap-3"
            }
          >
            <span className="font-mono text-sm font-semibold text-teal-700">{String(index + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ) : null;
  }

  if (block.type === "ol_check") {
    const items = Array.isArray(block.items)
      ? block.items.filter(
          (item): item is { label: string; text: string } =>
            typeof item === "object" && item !== null && typeof item.label === "string" && typeof item.text === "string",
        )
      : [];

    return items.length > 0 ? (
      <ol className={editorial ? "my-8 grid border-y border-slate-200 sm:grid-cols-2" : "my-6 space-y-4"}>
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className={
              editorial
                ? "border-b border-slate-200 py-6 sm:px-6 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                : "rounded-lg border border-slate-200 bg-white p-5"
            }
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs font-semibold text-teal-700">{String(index + 1).padStart(2, "0")}</span>
              <strong className="text-base text-slate-900">{item.label}</strong>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
          </li>
        ))}
      </ol>
    ) : null;
  }

  if (block.type === "legal_callout") {
    return block.text ? (
      <aside
        className={
          editorial
            ? "rounded-[14px] border border-[#f2c6c1] bg-[#fdeeec] px-6 py-5 text-[15.5px] leading-7 text-[#5a1712]"
            : "border-l-4 border-amber-400 bg-amber-50 px-5 py-4 text-sm leading-7 text-slate-700"
        }
      >
        {block.text}
      </aside>
    ) : null;
  }

  if (block.type === "inline_cta") {
    return block.text ? (
      <aside
        className={
          editorial
            ? "my-7 grid gap-5 rounded-xl border border-[#dde6e7] bg-white px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
            : "my-7 border-y border-teal-200 bg-teal-50/60 px-5 py-5"
        }
      >
        <p className={editorial ? "text-[16px] font-medium leading-7 text-[#0e1c26]" : "text-sm leading-7 text-slate-700"}>{block.text}</p>
        {block.link_label && block.link_url ? (
          <a
            href={block.link_url}
            className={
              editorial
                ? "inline-flex whitespace-nowrap rounded-lg bg-[#0d6b6b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0a5252]"
                : "mt-3 inline-flex font-semibold text-teal-800 underline decoration-teal-300 underline-offset-4 hover:text-teal-950"
            }
          >
            {block.link_label}
          </a>
        ) : null}
      </aside>
    ) : null;
  }

  if (block.type === "block_cta") {
    return (
      <aside
        className={
          editorial
            ? "my-8 overflow-hidden rounded-[14px] border border-[#bcdcd8] bg-[#e7f2f1] p-6 sm:p-7"
            : "my-8 rounded-lg border border-teal-200 bg-teal-50/70 p-6"
        }
      >
        {block.heading ? <h3 className={editorial ? "text-xl font-bold tracking-tight text-[#0a5252]" : "text-xl font-semibold tracking-tight text-slate-900"}>{block.heading}</h3> : null}
        {block.body ? <p className={editorial ? "mt-3 max-w-2xl text-[15.5px] leading-7 text-[#33505f]" : "mt-3 text-sm leading-7 text-slate-700"}>{block.body}</p> : null}
        {block.link_label && block.link_url ? (
          <a
            href={block.link_url}
            className={editorial ? "mt-5 inline-flex rounded-lg bg-[#0d6b6b] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0a5252]" : "mt-4 inline-flex rounded-md bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900"}
          >
            {block.link_label}
          </a>
        ) : null}
        {block.sub_text ? <p className={editorial ? "mt-3 text-xs leading-6 text-[#6b8493]" : "mt-3 text-xs leading-6 text-slate-500"}>{block.sub_text}</p> : null}
      </aside>
    );
  }

  return block.text ? (
    <p className={editorial ? "text-[17px] leading-[1.82] tracking-[-0.01em] text-[#0e1c26]" : undefined}>
      <InlineText text={block.text} />
    </p>
  ) : null;
}

function resolveRelatedLinks(article: Article): ResolvedArticleLink[] {
  if (article.slug === top3ArticleSlug) {
    return top3RelatedLinks;
  }

  if (!Array.isArray(article.internal_links)) {
    return [];
  }

  return article.internal_links.flatMap((link) => {
    if (typeof link !== "string") {
      if ("label" in link && typeof link.label === "string" && typeof link.url === "string") {
        return [link];
      }

      if ("anchor" in link && typeof link.anchor === "string" && typeof link.slug === "string") {
        return link.position === "inline" ? [] : [{ label: link.anchor, url: link.slug }];
      }

      return [];
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
  const statStrip = Array.isArray(article.stat_strip) ? article.stat_strip : [];
  const summaryParagraphs = Array.isArray(article.summary_paragraphs) ? article.summary_paragraphs : [];
  const sections = Array.isArray(article.sections) ? article.sections : [];
  const richSections = Array.isArray(article.rich_sections) ? article.rich_sections : [];
  const cautionChecklist = Array.isArray(article.caution_checklist) ? article.caution_checklist : [];
  const conclusion = article.conclusion ?? { heading: "결론", paragraphs: [] as string[] };
  const faqs = Array.isArray(article.faqs) ? article.faqs : [];
  const authorBox = Array.isArray(article.author_box) ? article.author_box : [];
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const references = resolveReferences(article.references);
  const relatedLinks = resolveRelatedLinks(article);
  const isTop3Article = article.slug === top3ArticleSlug;
  const isA01Article = article.slug === "chatgpt-hospital-visibility";
  const isWhiteBlueTheme =
    article.visual_theme === "white-blue" ||
    article.presentation?.theme === "white-blue";
  const summaryLabel =
    article.presentation?.summary_label ??
    article.summary_label ??
    "핵심 요약";

  return (
    <article className={isA01Article ? "min-w-0 space-y-[52px]" : "min-w-0 space-y-10"}>
      <header
        className={
          isA01Article
            ? "relative border-b border-[#dde6e7] bg-white py-[38px] [box-shadow:0_0_0_100vmax_#fff] [clip-path:inset(0_-100vmax)] sm:py-14"
            : "rounded-lg border border-slate-200 bg-slate-50/80 p-8 shadow-sm sm:p-10"
        }
      >
        <p
          className={
            isA01Article
              ? "inline-flex rounded-full border border-[#bcdcd8] bg-[#e7f2f1] px-3 py-1.5 text-[12.5px] font-bold tracking-[0.14em] text-[#0d6b6b]"
              : "text-sm font-semibold text-teal-800"
          }
        >
          {article.categoryName}
        </p>
        <h1
          className={
            isA01Article
              ? "mt-5 max-w-3xl break-keep text-[28px] font-bold leading-[1.38] tracking-[-0.02em] text-[#0e1c26] [font-family:'Batang','Noto_Serif_KR','Nanum_Myeongjo',Georgia,serif] sm:text-[37px]"
              : "mt-3 break-keep text-3xl font-semibold tracking-tight sm:text-4xl"
          }
        >
          {article.h1 ?? article.title}
        </h1>
        <p className={isA01Article ? "mt-[18px] max-w-3xl text-[17px] leading-[1.78] text-[#33505f] sm:text-[18px]" : "mt-4 text-lg leading-8 text-slate-600"}>{article.meta_description}</p>
        <div
          className={
            isA01Article
              ? "mt-[26px] flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#eef3f3] pt-4 text-[13px] text-[#6b8493]"
              : "mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500"
          }
        >
          {article.author ? <span>{article.author}</span> : null}
          <span>발행일 {article.publishedAt}</span>
          {article.updatedAt ? <span>수정일 {article.updatedAt}</span> : null}
          <span>발행 주체: {articlePublisherLabel}</span>
          <span>정보 최종 확인 {article.updatedAt ?? lastVerified}</span>
        </div>
        {hiddenCandidate ? (
          <p className="mt-5 w-fit rounded-sm bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700">
            목록 숨김 · 편집 보강 검토 중
          </p>
        ) : null}
      </header>


      <section
        className={
          isA01Article
            ? "overflow-hidden rounded-[14px] border border-[#bcdcd8] bg-white pb-6 shadow-[0_2px_10px_rgba(14,28,38,0.05)]"
            : isWhiteBlueTheme
            ? "rounded-lg border border-blue-200 bg-blue-50 p-6 shadow-sm sm:p-8"
            : "rounded-lg border border-teal-100 bg-teal-50/70 p-6 shadow-sm sm:p-8"
        }
      >
        <div className={isA01Article ? "flex flex-wrap items-center gap-3 bg-[#0d6b6b] px-7 py-[15px]" : "flex flex-wrap items-center gap-3"}>
          <h2
            className={
              isA01Article
                ? "text-[13.5px] font-extrabold tracking-[0.14em] text-white"
                : isWhiteBlueTheme
                ? "text-xl font-semibold text-blue-900"
                : "text-sm font-semibold text-teal-800"
            }
          >
            {summaryLabel}
          </h2>
          {summaryParagraphs.length === 0 ? (
            <span
              className={
                isWhiteBlueTheme
                  ? "rounded-sm border border-blue-200 bg-white px-3 py-1 text-sm font-medium text-blue-800"
                  : "rounded-sm border border-teal-200 bg-white px-3 py-1 text-sm font-medium text-teal-800"
              }
            >
              핵심 키워드: {article.focus_keyword ?? ""}
            </span>
          ) : null}
        </div>
        {summaryParagraphs.length > 0 ? (
          <div
            className={
              isA01Article
                ? summaryParagraphs.length === 1
                  ? "mt-5 max-w-3xl px-7 text-[16.5px] leading-[1.78] text-[#0e1c26]"
                  : "mt-5 grid gap-4 px-7 text-[16.5px] leading-[1.78] text-[#0e1c26]"
                : "mt-4 space-y-3 text-base leading-8 text-slate-700"
            }
          >
            {summaryParagraphs.map((paragraph, index) => (
              <div
                key={`${paragraph}-${index}`}
                className={isA01Article && summaryParagraphs.length > 1 ? "border-b border-[#eef3f3] pb-4 last:border-b-0 last:pb-0" : undefined}
              >
                {isA01Article && summaryParagraphs.length > 1 ? <span className="mr-2 inline-flex h-[21px] w-[21px] items-center justify-center rounded-full border border-[#0d6b6b] text-[11px] font-extrabold text-[#0a5252]">{index + 1}</span> : null}
                <p>{paragraph}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="mt-4 text-base leading-8 text-slate-700">{quickAnswer.definition_sentence}</p>
            <p className="mt-3 text-base leading-8 text-slate-700">{quickAnswer.framing_sentence}</p>
            <div
              className={
                isWhiteBlueTheme
                  ? "mt-5 rounded-lg border border-blue-200 bg-white p-4 text-sm leading-7 text-slate-700"
                  : "mt-5 rounded-lg border border-teal-200 bg-white p-4 text-sm leading-7 text-slate-700"
              }
            >
              <p className="font-semibold text-slate-900">선택 기준</p>
              <p className="mt-2">{quickAnswer.selection_criteria}</p>
            </div>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-900">{quickAnswer.conclusion_sentence}</p>
          </>
        )}
        <SourceLinks sources={quickAnswer.sources} />
      </section>

      {statStrip.length > 0 ? (
        <section aria-label="핵심 수치" className="border-y border-slate-200 py-6">
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {statStrip.map((item) => (
              <div key={`${item.value}-${item.label}`}>
                <dt className="text-sm leading-6 text-slate-600">{item.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {dataCards.length > 0 ? (
        <section
          aria-label="핵심 요약"
          className={
            article.data_cards_layout === "two-by-two"
              ? "grid gap-4 sm:grid-cols-2"
              : "grid gap-4 md:grid-cols-3"
          }
        >
          {dataCards.map((card) => (
            <div
              key={card.title}
              className={
                isWhiteBlueTheme
                  ? "rounded-lg border border-blue-200 bg-white p-6 shadow-sm"
                  : "rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              }
            >
              <h2
                className={
                  isWhiteBlueTheme
                    ? "text-lg font-semibold text-blue-900"
                    : "text-lg font-semibold text-slate-900"
                }
              >
                {card.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
            </div>
          ))}
        </section>
      ) : null}

      {sections.length > 0 ? (
        <section className="space-y-10">
          {sections.map((section, sectionIndex) => {
            const paragraphs = Array.isArray(section.paragraphs) ? section.paragraphs : [];
            const referencedTable = section.table_ref
              ? article.tables?.find((table) => table.id === section.table_ref)
              : undefined;
            const sectionTable = section.table ??
              (referencedTable
                ? {
                    ...referencedTable,
                    columns: referencedTable.columns ?? referencedTable.headers,
                    note: referencedTable.note ?? article.limits_note,
                  }
                : null);

            return (
              <section key={`${section.heading ?? "section"}-${sectionIndex}`}>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.heading}</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
                  {paragraphs.map((paragraph, index) => (
                    <div key={`${typeof paragraph === "string" ? paragraph : paragraph.text ?? "paragraph"}-${index}`}>
                      <p>
                        <InlineText text={typeof paragraph === "string" ? paragraph : paragraph.text ?? ""} />
                      </p>
                      <SourceLinks sources={typeof paragraph === "string" ? undefined : paragraph.sources} />
                    </div>
                  ))}
                </div>
                {sectionTable ? <SectionTable table={sectionTable} /> : null}
              </section>
            );
          })}
        </section>
      ) : null}

      {richSections.length > 0 ? (
        <section className={isA01Article ? "min-w-0" : "space-y-12"}>
          {richSections.map((section, sectionIndex) => (
            <section
              key={`${section.heading}-${sectionIndex}`}
              className={isA01Article ? "mb-[52px] min-w-0 last:mb-0" : undefined}
            >
              {isA01Article ? (
                <span className="mb-2 block text-[12.5px] font-bold tracking-[0.16em] text-[#0d6b6b]">{String(sectionIndex + 1).padStart(2, "0")}</span>
              ) : null}
              <div className={isA01Article ? "min-w-0" : undefined}>
                <h2
                  className={
                    isA01Article
                      ? "max-w-3xl break-keep border-b-2 border-[#0e1c26] pb-3.5 text-[23px] font-bold leading-[1.45] tracking-[-0.02em] text-[#0e1c26] [font-family:'Batang','Noto_Serif_KR','Nanum_Myeongjo',Georgia,serif] sm:text-[27px]"
                      : "text-2xl font-semibold tracking-tight text-slate-900"
                  }
                >
                  {section.heading}
                </h2>
                <div className={isA01Article ? "mt-5 space-y-[18px]" : "mt-5 space-y-5 text-base leading-8 text-slate-700"}>
                  {section.blocks.map((block, blockIndex) => (
                    <RichArticleBlock
                      key={`${block.type}-${block.text ?? block.heading ?? blockIndex}-${blockIndex}`}
                      block={block}
                      editorial={isA01Article}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </section>
      ) : null}

      {cautionChecklist.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            {article.caution_title ?? "확인할 사항"}
          </h2>
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

      {conclusion.heading || (Array.isArray(conclusion.paragraphs) && conclusion.paragraphs.length > 0) ? (
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          {conclusion.heading ? <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{conclusion.heading}</h2> : null}
          <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
            {Array.isArray(conclusion.paragraphs)
              ? conclusion.paragraphs.map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}><InlineText text={paragraph} /></p>
                ))
              : null}
          </div>
        </section>
      ) : null}

      {relatedLinks.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            {isTop3Article ? "함께 보면 좋은 GEO 아티클" : "관련 주제"}
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
        <section className={isA01Article ? "mb-0" : "rounded-lg border border-slate-200 bg-white p-8 shadow-sm"}>
          {isA01Article ? <p className="mb-2 text-[12.5px] font-bold tracking-[0.16em] text-[#0d6b6b]">FAQ</p> : null}
          <h2 className={isA01Article ? "border-b-2 border-[#0e1c26] pb-3.5 text-[23px] font-bold leading-[1.45] tracking-[-0.02em] text-[#0e1c26] [font-family:'Batang','Noto_Serif_KR','Nanum_Myeongjo',Georgia,serif] sm:text-[27px]" : "text-2xl font-semibold tracking-tight text-slate-900"}>자주 묻는 질문</h2>
          <div className={isA01Article ? "mt-5 space-y-2.5" : "mt-6 space-y-4"}>
            {faqs.map((faq) =>
              isA01Article ? (
                <details key={faq.question} className="group overflow-hidden rounded-xl border border-[#dde6e7] bg-white open:border-[#bcdcd8]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[22px] py-[18px] text-[16.5px] font-bold leading-6 text-[#0e1c26] group-open:bg-[#e7f2f1] group-open:text-[#0a5252]">
                    <span>{faq.question}</span>
                    <span aria-hidden="true" className="text-xl font-normal text-[#0d6b6b] group-open:hidden">+</span>
                    <span aria-hidden="true" className="hidden text-xl font-normal text-[#0d6b6b] group-open:inline">−</span>
                  </summary>
                  <div className="border-t border-[#eef3f3] px-[22px] pb-1 pt-[18px]">
                    <p className="mb-4 text-[16px] leading-[1.75] text-[#33505f]">{faq.answer}</p>
                    <SourceLinks sources={faq.sources} />
                  </div>
                </details>
              ) : (
                <section key={faq.question} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  <SourceLinks sources={faq.sources} />
                </section>
              ),
            )}
          </div>
        </section>
      ) : null}

      {authorBox.length > 0 ? (
        <section className={isA01Article ? "rounded-[14px] border border-[#dde6e7] bg-[#eef2f3] px-6 py-6" : "border-y border-slate-200 py-7"}>
          <div className={isA01Article ? "space-y-1 text-[13.5px] leading-7 text-[#6b8493]" : "space-y-2 text-sm leading-7 text-slate-600"}>
            {authorBox.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      {article.editorial ? (
        <section className="rounded-lg border border-blue-200 bg-slate-50 p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            작성·검토 기준
          </h2>
          <dl className="mt-5 grid gap-4 text-sm leading-7 sm:grid-cols-2">
            {article.editorial.author ? (
              <div>
                <dt className="font-semibold text-slate-900">작성 주체</dt>
                <dd className="text-slate-600">{article.editorial.author}</dd>
              </div>
            ) : null}
            {article.editorial.publisher ? (
              <div>
                <dt className="font-semibold text-slate-900">발행 주체</dt>
                <dd className="text-slate-600">{article.editorial.publisher}</dd>
              </div>
            ) : null}
            {article.editorial.reviewedAt ? (
              <div>
                <dt className="font-semibold text-slate-900">최종 확인일</dt>
                <dd className="text-slate-600">{article.editorial.reviewedAt}</dd>
              </div>
            ) : null}
            {article.editorial.basis ? (
              <div>
                <dt className="font-semibold text-slate-900">작성 기준</dt>
                <dd className="text-slate-600">{article.editorial.basis}</dd>
              </div>
            ) : null}
          </dl>


        </section>
      ) : null}

      {article.verified_at || (Array.isArray(article.revision_log) && article.revision_log.length > 0) ? (
        <section className="border-y border-slate-200 py-7">
          {article.verified_at ? <p className="text-sm leading-7 text-slate-600">{article.verified_at}</p> : null}
          {Array.isArray(article.revision_log) && article.revision_log.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
              {article.revision_log.map((entry) => <li key={entry}>{entry}</li>)}
            </ul>
          ) : null}
        </section>
      ) : null}

      {references.length > 0 ? (
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">참고 자료</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7">
            {references.map((reference) => (
              <li key={reference.url}>
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-teal-800 underline decoration-teal-200 underline-offset-4 hover:text-teal-950"
                >
                  {reference.title}
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


    </article>
  );
}
