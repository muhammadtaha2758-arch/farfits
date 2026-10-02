import Image from "next/image";
import type { Product } from "@/lib/products";
import { Placeholder } from "./Placeholder";

type ProductImageProps = {
  product: Product;
  ratio?: string;
  focus?: "toe" | "sole" | "heel";
};

export function ProductImage({
  product,
  ratio = "4/5",
  focus,
}: ProductImageProps) {
  if (product.img) {
    const alt = focus
      ? `${product.brand} ${product.name}, ${focus}`
      : `${product.brand} ${product.name}`;
    const image = (
      <Image
        src={product.img}
        alt={alt}
        fill
        sizes="(max-width: 1000px) 50vw, 25vw"
        style={{ objectFit: "cover" }}
      />
    );

    return (
      <div
        className="ph"
        data-focus={focus}
        style={{ ["--r" as string]: ratio }}
      >
        {focus ? <span className="crop">{image}</span> : image}
      </div>
    );
  }

  return (
    <Placeholder
      tone={product.tone}
      label={`${product.brand} ${product.name} — photo`}
      ratio={ratio}
    />
  );
}
