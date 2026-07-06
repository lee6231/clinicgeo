import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 text-slate-950">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">404</p>
        <h1 className="mt-3 text-3xl font-semibold">찾는 페이지가 없습니다.</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          요청하신 아티클 또는 페이지는 아직 공개되지 않았거나 주소가 변경되었을 수 있습니다.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white">
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
