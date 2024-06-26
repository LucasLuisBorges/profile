interface IProps {
  emoji?: string | null;
  text?: string | null;
  children?: React.ReactNode;
}

export const Callout = ({ emoji = null, text = null, children }: IProps) => (
  <div className="bg-[#333] text-gray-300 flex items-start p-3 my-6 text-base">
    <span className="block w-6 text-center mr-2 scale-[1.2]">{emoji}</span>
    <span className="block grow">{text ?? children}</span>
  </div>
);
