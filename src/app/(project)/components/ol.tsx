interface IProps {
  children: React.ReactNode;
}

export function OL({ children }: IProps) {
  return <ol className="my-5 list-decimal list-inside">{children}</ol>;
}
