import { Caption } from "./caption";

interface IProps {
  children: React.ReactNode;
  scroll?: boolean;
  caption?: any;
}

export const Snippet = ({
  children,
  scroll = true,
  caption = null,
}: IProps) => (
  <div className="my-6">
    <pre
      className={`
      p-4
      text-sm
      bg-[#222] text-gray-300

      ${
        scroll
          ? "overflow-scroll"
          : "whitespace-pre-wrap break-all overflow-hidden"
      }
    `}
    >
      <code>{children}</code>
    </pre>

    {caption != null ? <Caption>{caption}</Caption> : null}
  </div>
);
