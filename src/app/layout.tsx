import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { fontSans } from "@/config/font";
import { cn } from "@/lib/utils/cn";
import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Lucas Luis Borges",
  description: "Meu perfil online",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={cn("antialiased", fontSans.className)}
      suppressHydrationWarning={true}
    >
      <body className="text-gray-100 max-w-2xl m-auto">
        <main className="p-6 pt-3 md:pt-6 min-h-screen">
          <Header />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
