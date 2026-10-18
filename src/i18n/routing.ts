import { defineRouting } from "next-intl/routing";

// No locale in the URL: the proxy picks it from the NEXT_LOCALE cookie, then Accept-Language,
// and rewrites to the statically rendered /[locale] page.
export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "never",
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});
