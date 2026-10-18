import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { MotionRoot } from "@/components/motion";
import { Nav } from "@/components/nav";
import { isLocale, links, locales, ui } from "@/content/i18n";
import "../globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { title, description } = ui[lang].meta;
  return {
    title: { default: title, template: "%s · Lucas Borges" },
    description,
    authors: [{ name: "Lucas Luis Borges", url: links.linkedin }],
    alternates: { languages: { "pt-BR": "/pt/", en: "/en/" } },
    openGraph: { title, description, type: "website", locale: lang === "pt" ? "pt_BR" : "en_US" },
    icons: { icon: "/favicon.ico", shortcut: "/favicon-16x16.png", apple: "/apple-touch-icon.png" },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <MotionRoot>
          <Nav lang={lang} />
          {children}
          <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/10 px-4 py-10 font-mono text-xs text-fog">
            <span>
              © {new Date().getFullYear()} · {ui[lang].footer}
            </span>
            <span className="flex gap-5">
              <a href={links.github} target="_blank" className="hover:text-lime">GitHub</a>
              <a href={links.linkedin} target="_blank" className="hover:text-lime">LinkedIn</a>
              <a href={`mailto:${links.email}`} className="hover:text-lime">E-mail</a>
            </span>
          </footer>
        </MotionRoot>
      </body>
    </html>
  );
}
