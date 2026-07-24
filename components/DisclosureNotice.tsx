import Link from "next/link";

type DisclosureNoticeProps = {
  compact?: boolean;
  title?: string;
};

export function DisclosureNotice({
  compact = false,
  title = "편집·이해관계 안내",
}: DisclosureNoticeProps) {
  return (
    <aside
      className={`border-l-4 border-amber-500 bg-amber-50 text-slate-800 ${compact ? "px-4 py-3" : "px-5 py-5 sm:px-6"}`}
      aria-label={title}
    >
      <p className="text-sm font-semibold text-amber-900">{title}</p>
      <p className="mt-2 text-sm leading-6">
        Clinic GEO는 콘텐츠에서 언급하는 병원·업체·대행사와 별도로 운영되는 편집형 정보 사이트입니다.
        광고, 제휴, 자료 제공 등 경제적 이해관계가 있는 콘텐츠에는 해당 관계를 별도로 표시하며, 관계가
        정보의 우월성이나 효과를 보장한다는 의미는 아닙니다.
      </p>
      {!compact ? (
        <Link
          href="/advertising-disclosure"
          className="mt-3 inline-flex text-sm font-semibold text-amber-950 underline decoration-amber-400 underline-offset-4"
        >
          광고·제휴 및 이해관계 기준 확인하기
        </Link>
      ) : null}
    </aside>
  );
}
