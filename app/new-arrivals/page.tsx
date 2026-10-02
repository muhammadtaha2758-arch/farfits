import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "New Arrivals",
};

export default function NewArrivalsPage() {
  const list = products.filter((p) => p.available);

  return (
    <>
      <section className="shophead rv">
        <p className="lab mute">Latest listings</p>
        <h1 className="disp">
          New
          <br />
          Arrivals
        </h1>
      </section>
      <section>
        <div className="grid">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
