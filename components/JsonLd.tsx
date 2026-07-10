export function JsonLd({ jsonLd }: { jsonLd: Record<string, unknown> | Array<Record<string, unknown>> }) {
  const content = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: content }} />;
}
