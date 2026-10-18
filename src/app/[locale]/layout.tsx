import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { MotionRoot } from "@/components/motion";
import { Nav } from "@/components/nav";
import { links } from "@/content/site";
import { routing } from "@/i18n/routing";
import "../globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { default: t("title"), template: "%s · Lucas Borges" },
    description: t("description"),
    authors: [{ name: "Lucas Luis Borges", url: links.linkedin }],
    openGraph: { title: t("title"), description: t("description"), type: "website", locale: locale === "pt" ? "pt_BR" : "en_US" },
    icons: { icon: "/favicon.ico", shortcut: "/favicon-16x16.png", apple: "/apple-touch-icon.png" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <html lang={locale === "pt" ? "pt-BR" : "en"} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <MotionRoot>
            <Nav />
            {children}
            <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/10 px-4 py-10 font-mono text-xs text-fog">
              <span>
                © {new Date().getFullYear()} · {t("footer")}
              </span>
              <span className="flex gap-5">
                <a href={links.github} target="_blank" className="hover:text-lime">GitHub</a>
                <a href={links.linkedin} target="_blank" className="hover:text-lime">LinkedIn</a>
                <a href={`mailto:${links.email}`} className="hover:text-lime">E-mail</a>
              </span>
            </footer>
          </MotionRoot>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
