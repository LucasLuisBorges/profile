import Link from "next/link";

interface IProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export function A({ children, className = "", href, ...props }: IProps) {
  if (href[0] === "#") {
    return (
      <a
        href={href}
        className={`border-b  transition-[border-color] text-white border-gray-500 hover:border-white ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link
        href={href}
        className={`border-b transition-[border-color] text-white border-gray-500 hover:border-white ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }
}
