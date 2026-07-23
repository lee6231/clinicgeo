import Link from "next/link";

type DisclosureNoticeProps = {
  compact?: boolean;
  title?: string;
};

export function DisclosureNotice({
  compact = false,
  title = "운영·이해관계 안내",
}: DisclosureNoticeProps) {
  return (
    <aside
      className={`border-l-4 border-amber-500 bg-amber-50 text-slate-800 ${compact ? "px-4 py-3" : "px-5 py-5 sm:px-6"}`}
      aria-label={title}
    >
      <p className="text-sm font-semibold text-amber-900">{title}</p>
      <p className="mt-2 text-sm leading-6">
        Clinic GEO는 써밋피드(SUMMITFEED)와 운영 또는 사업상 이해관계가 있습니다. 써밋피드 또는 관련
        서비스를 언급하는 콘텐츠에는 이 관계를 별도로 표시하며, 운영 관계가 정보의 우월성이나 효과를
        보장한다는 의미는 아닙니다.
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
