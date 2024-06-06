import type { ReactNode } from "react";

export function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-5 pl-3 border-l-4 border-gray-600 text-gray-400">
      {children}
    </blockquote>
  );
}
