import { A } from "./a";
import { P } from "./p";

interface IProps {
  children: React.ReactNode;
}

export const FootNotes = ({ children }: IProps) => (
  <div className="text-base before:w-[200px] before:m-auto before:content[''] before:border-t before:border-[#444] before:block before:my-10">
    {children}
  </div>
);

export const Ref = (id: string) => (
  <a
    href={`#f${id}`}
    id={`s${id}`}
    className="relative text-xs top-[-5px] no-underline"
  >
    [{id}]
  </a>
);

interface IProps {
  id: any;
  children: React.ReactNode;
}

export const FootNote = ({ id, children }: IProps) => (
  <P>
    {id}.{" "}
    <A href={`#s${id}`} className="no-underline">
      ^
    </A>{" "}
    {children}
  </P>
);
