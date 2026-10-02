import { Suspense } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";
import { filterProducts } from "@/lib/products";

export default async function ShopPage(props: PageProps<"/shop">) {
  const sp = await props.searchParams;
  const one = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const category = one(sp.c) || "";
  const brand = one(sp.b) || "";
  const size = one(sp.s) || "";
  const condition = one(sp.k) || "";
  const price = one(sp.p) || "";
  const sort = one(sp.o) || "new";
  const query = one(sp.q) || "";

  const list = filterProducts({
    category,
    brand,
    size,
    condition,
    price,
    query,
    sort,
  });

  return (
    <>
      <section className="shophead">
        <p className="lab mute">
          {category || "Everything"} / {list.length} result
          {list.length === 1 ? "" : "s"}
        </p>
        <h1 className="disp">Shop All</h1>
      </section>
      <Suspense fallback={<div className="bar" />}>
        <ShopFilters />
      </Suspense>
      <p className="cnt lab mute">
        {list.length} result{list.length === 1 ? "" : "s"}
      </p>
      <section style={{ paddingTop: 28 }}>
        {list.length ? (
          <div className="grid three">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="serif" style={{ fontSize: 40 }}>
            Nothing matches — try loosening a filter.
          </p>
        )}
      </section>
    </>
  );
}
