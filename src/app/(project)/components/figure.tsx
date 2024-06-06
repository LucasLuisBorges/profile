interface IProps {
  wide?: boolean;
  children: React.ReactNode;
}

export function Figure({ wide = false, children }: IProps) {
  return (
    <div
      className={`
    text-center
    ${
      wide
        ? `
      bg-[#111]
      relative
      before:bg-[#111]
      before:w-[10000%]
      before:h-[100%]
      before:content-[""]
      before:top-[0]
      before:left-[-1000px]
      before:absolute
      before:z-[-1]
    `
        : ""
    }
  `}
    >
      {children}
    </div>
  );
}
