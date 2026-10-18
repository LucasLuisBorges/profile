import type { Metadata } from "next";

export const metadata: Metadata = { title: "Lucas Borges — Senior AI Engineer" };

// Static export has no middleware, so "/" picks the language in the browser.
const script = `location.replace(/^pt/i.test(navigator.language) ? "/pt/" : "/en/")`;

export default function Root() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <a href="/pt/">Português</a> · <a href="/en/">English</a>
      </noscript>
    </>
  );
}
