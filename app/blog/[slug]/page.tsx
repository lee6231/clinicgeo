import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { posts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post || !post.published) {
    return buildMetadata(`/blog/${slug}`, "아티클을 찾을 수 없습니다", "요청하신 아티클은 존재하지 않습니다.");
  }

  return buildMetadata(`/blog/${slug}`, post.title, post.description);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post || !post.published) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: {
        "@type": "Organization",
        name: "SUMMITFEED",
      },
      publisher: {
        "@type": "Organization",
        name: "SUMMITFEED",
        url: "https://clinicgeo.co.kr",
      },
      mainEntityOfPage: `https://clinicgeo.co.kr/blog/${post.slug}`,
      articleSection: post.categoryName,
    },
    ...(post.faq && post.faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header />
      <JsonLd jsonLd={jsonLd} />
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{post.categoryName}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{post.description}</p>
          <div className="mt-6 text-sm text-slate-500">
            <span>발행일 {post.publishedAt}</span>
            {post.updatedAt ? <span className="ml-3">수정일 {post.updatedAt}</span> : null}
          </div>
        </div>

        {post.body ? (
          <article className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-700">
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </article>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-600">
            이 아티클의 본문은 아직 준비되지 않았습니다.
          </div>
        )}

        {post.faq && post.faq.length > 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-semibold">자주 묻는 질문</h2>
            <div className="mt-6 space-y-4">
              {post.faq.map((item) => (
                <div key={item.question} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-slate-900">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
