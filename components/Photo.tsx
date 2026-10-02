import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
};

export function Photo({ src, alt, ratio = "4/5", className = "" }: PhotoProps) {
  return (
    <div
      className={`ph ${className}`.trim()}
      style={{ ["--r" as string]: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 900px) 100vw, 40vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
