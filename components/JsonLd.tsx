"use client";

import Script from "next/script";
import { useId } from "react";

export function JsonLd({ jsonLd }: { jsonLd: Record<string, unknown> | Array<Record<string, unknown>> }) {
  const id = useId();
  const content = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return <Script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: content }} />;
}
