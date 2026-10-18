import type { ReactNode } from "react";

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ background: "#07070c" }}>{children}</body>
    </html>
  );
}
