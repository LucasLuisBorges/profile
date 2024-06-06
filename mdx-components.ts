import { A as a } from "@/app/(project)/components/a";
import { Blockquote as blockquote } from "@/app/(project)/components/blockquote";
import { Callout } from "@/app/(project)/components/callout";
import { Caption } from "@/app/(project)/components/caption";
import { Code as code } from "@/app/(project)/components/code";
import { Figure } from "@/app/(project)/components/figure";
import { FootNote, FootNotes, Ref } from "@/app/(project)/components/footnotes";
import { H1 as h1 } from "@/app/(project)/components/h1";
import { H2 as h2 } from "@/app/(project)/components/h2";
import { H3 as h3 } from "@/app/(project)/components/h3";
import { HR as hr } from "@/app/(project)/components/hr";
import { Image } from "@/app/(project)/components/image";
import { LI as li } from "@/app/(project)/components/li";
import { OL as ol } from "@/app/(project)/components/ol";
import { P as p } from "@/app/(project)/components/p";
import { Snippet } from "@/app/(project)/components/snippet";
import { Tweet } from "@/app/(project)/components/tweet";
import { UL as ul } from "@/app/(project)/components/ul";
import { YouTube } from "@/app/(project)/components/youtube";

export function useMDXComponents(components: {
  [component: string]: React.ComponentType;
}) {
  return {
    ...components,
    a,
    h1,
    h2,
    h3,
    p,
    ol,
    ul,
    li,
    hr,
    code,
    pre: Snippet,
    img: Image,
    blockquote,
    Tweet,
    Image,
    Figure,
    Snippet,
    Caption,
    Callout,
    YouTube,
    Ref,
    FootNotes,
    FootNote,
  };
}
