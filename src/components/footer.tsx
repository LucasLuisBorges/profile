import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 pt-3 pb-6 flex text-xs text-center mt-3 text-gray-400 font-mono">
      <div className="grow text-left">
        Lucas Borges (
        <Link
          className="border-b transition-[border-color] text-white border-gray-500 hover:border-white"
          target="_blank"
          href="https://www.instagram.com/llborgesss/"
        >
          @llborgesss
        </Link>
        )
      </div>
      <div>
        <Link
          className="border-b transition-[border-color] text-white border-gray-500 hover:border-white"
          target="_blank"
          href="https://github.com/LucasLuisBorges"
        >
          Github
        </Link>
      </div>
    </footer>
  );
}
