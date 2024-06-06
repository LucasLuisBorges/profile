interface IProps {
  children: React.ReactNode;
}

export function UL({ children }: IProps) {
  return <ul className="my-5 list-none list-inside">{children}</ul>;
}
