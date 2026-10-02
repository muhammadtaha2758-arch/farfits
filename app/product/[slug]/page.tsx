import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, products } from "@/lib/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/product/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return { title: `${product.brand} ${product.name}` };
}

export default async function ProductPage(
  props: PageProps<"/product/[slug]">,
) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const more = products.filter((x) => x.slug !== slug && x.available).slice(0, 4);

  return (
    <>
      <ProductDetail product={product} />

      <div className="auth">
        <div className="rv">
          <p className="lab" style={{ marginBottom: 22 }}>
            Authenticity
          </p>
          <q>Every pair is carefully selected and inspected before being listed.</q>
        </div>
        <div className="rv">
          <p className="lab" style={{ marginBottom: 22 }}>
            Exchange policy
          </p>
          <q
            className="serif"
            style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Exchange possible.
          </q>
          <Link
            className="lab"
            href="/exchange-policy"
            style={{
              display: "inline-block",
              marginTop: 24,
              borderBottom: "1px solid",
            }}
          >
            Read the policy
          </Link>
        </div>
      </div>

      <section>
        <div className="sh rv">
          <h2
            className="disp"
            style={{ fontSize: "clamp(34px, 6vw, 90px)" }}
          >
            More to wear
          </h2>
        </div>
        <div className="grid">
          {more.map((x) => (
            <ProductCard key={x.slug} product={x} />
          ))}
        </div>
      </section>
    </>
  );
}
