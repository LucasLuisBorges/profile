interface IProps {
  children: React.ReactNode;
}

export function P({ children }: IProps) {
  return <p className="my-5 [blockquote_&]:my-2">{children}</p>;
}
