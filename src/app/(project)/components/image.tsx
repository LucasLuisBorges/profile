import ImageNext from "next/image";

export async function Image({
  src,
  alt: originalAlt,
}: {
  src: string;
  alt?: string;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <ImageNext width={1080} height={1080} src={src} alt={originalAlt ?? ""} />
  );
}
