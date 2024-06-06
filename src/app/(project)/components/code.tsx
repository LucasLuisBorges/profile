interface IProps {
  children: React.ReactNode;
}

export const Code = ({ children }: IProps) => {
  return (
    <code
      className={`
        [p_&]:text-sm
        [p_&]:px-1
        [p_&]:py-0.5
        [p_&]:rounded-sm
        [p_&]:bg-[#333]
      `}
    >
      {children}
    </code>
  );
};
