import Link from "next/link";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="flex mb-5 md:mb-10 items-center">
      <Logo />

      <nav className="font-mono text-xs grow justify-end items-center flex gap-1 md:gap-3">
        <Link
          href="/trajectory"
          className="inline-flex hover:bg-[#313131] active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
        >
          Trajetória
        </Link>

        <Link
          href="/about"
          className="inline-flex hover:bg-[#313131] active:bg-[#242424] rounded-sm p-2 transition-[background-color]"
        >
          Sobre
        </Link>
        <a
          href="https://www.linkedin.com/in/lucasluisborges/"
          target="_blank"
          className="inline-flex hover:bg-[#313131] active:bg-[#242424] items-center p-2 rounded-sm transition-[background-color] whitespace-nowrap -mr-2"
        >
          <LinkedinIcon style={{ marginRight: 4 }} /> Follow{" "}
          <span className="hidden md:inline">&nbsp;me</span>
        </a>
      </nav>
    </header>
  );
}

function LinkedinIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14.667 0H1.333C.597 0 0 .597 0 1.333v13.334C0 15.403.597 16 1.333 16h13.334C15.403 16 16 15.403 16 14.667V1.333C16 .597 15.403 0 14.667 0zM4.667 13.333H2.333V6h2.334v7.333zM3.5 5c-.767 0-1.333-.6-1.333-1.333C2.167 2.933 2.733 2.333 3.5 2.333S4.833 2.933 4.833 3.667C4.833 4.4 4.267 5 3.5 5zm9.833 8.333h-2.333V9.733c0-.867-.017-1.983-1.2-1.983-1.2 0-1.383 1-1.383 1.983v3.6H6.333V6h2.233v1h.034c.3-.567 1.017-1.167 2.1-1.167 2.25 0 2.667 1.483 2.667 3.417v3.95z"
      />
    </svg>
  );
}
