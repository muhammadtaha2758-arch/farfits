import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { Visit } from "@/components/Visit";
import { IG } from "@/lib/constants";
import { products } from "@/lib/products";

const TICKER = [
  "Authentic only",
  "Inspected before listing",
  "Exchange possible",
  "North Nazimabad, Karachi",
];

const IG_TILES: { src: string; alt: string; ratio: string }[] = [
  { src: "/editorial/ig-1.jpg", alt: "Black and white low-top", ratio: "1/1" },
  { src: "/editorial/ig-2.jpg", alt: "Suede upper and gum sole", ratio: "4/5" },
  { src: "/editorial/ig-3.jpg", alt: "Canvas high-top on concrete", ratio: "3/4" },
  { src: "/editorial/ig-4.jpg", alt: "Leather lace detail", ratio: "1/1" },
  { src: "/editorial/ig-5.jpg", alt: "Black leather oxford", ratio: "3/4" },
  { src: "/editorial/ig-6.jpg", alt: "Pair of mesh runners", ratio: "1/1" },
  { src: "/editorial/ig-7.jpg", alt: "Air cushion heel", ratio: "4/5" },
  { src: "/editorial/ig-8.jpg", alt: "Black skate shoe", ratio: "1/1" },
];

export default function HomePage() {
  const edit = products.slice(0, 4);
  const arrivals = products.filter((p) => p.available).slice(4, 8);
  const ticker = Array.from({ length: 8 }, () => TICKER).flat();

  return (
    <>
      <section className="hero">
        <div className="bg" data-par="-.15">
          <Image
            src="/editorial/hero.jpg"
            alt="White leather sneaker in low light"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(transparent 55%, rgba(0,0,0,.55))",
          }}
        />
        <h1 className="disp">
          <span className="mask">
            <span>FAR</span>
          </span>
          <span className="mask">
            <span style={{ animationDelay: "0.12s" }}>FITS</span>
          </span>
        </h1>
        <div className="sub">
          <div>
            <p className="lab" style={{ marginBottom: 8 }}>
              Authentic Thrifted Footwear
            </p>
            <p className="serif">Curated. Authentic. Distinct.</p>
          </div>
          <Link className="btn" href="/shop">
            Shop Collection <span>→</span>
          </Link>
        </div>
      </section>

      <div className="ticker lab">
        <div>
          {ticker.map((t, i) => (
            <span key={`${t}-${i}`}>{t}</span>
          ))}
        </div>
      </div>

      <section>
        <div className="sh">
          <h2 className="disp">
            The
            <br />
            Current
            <br />
            Edit
          </h2>
          <p className="lab mute" style={{ maxWidth: "26ch" }}>
            Four pairs we&apos;d wear this week. One of each — when it&apos;s
            gone, it&apos;s gone.
          </p>
        </div>
        <div className="edit">
          {edit.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              quickAdd={false}
              ratio={i % 3 === 0 ? "4/5" : "1/1"}
            />
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="sh">
          <h2
            className="disp"
            style={{ fontSize: "clamp(34px, 6vw, 90px)" }}
          >
            New Arrivals
          </h2>
          <Link className="btn l" href="/new-arrivals">
            View all →
          </Link>
        </div>
        <div className="grid">
          {arrivals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="about">
        <div>
          <p className="lab" style={{ marginBottom: 28 }}>
            About
          </p>
          <h2 className="disp">
            Authentic
            <br />
            footwear.
            <br />
            <span
              className="serif"
              style={{ textTransform: "none", letterSpacing: "-0.02em" }}
            >
              Curated differently.
            </span>
          </h2>
          <p>
            FARFITS is an authentic thrift shoe store built around carefully
            selected footwear, distinctive finds, and pieces worth wearing
            again.
          </p>
          <p>
            Every pair is selected with attention to authenticity, condition,
            and character.
          </p>
          <Link className="btn" style={{ marginTop: 36 }} href="/about">
            Our story →
          </Link>
        </div>
        <Photo
          src="/editorial/editorial-detail.jpg"
          alt="Close detail of a perforated leather toe"
          ratio="3/4"
        />
      </section>

      <section>
        <div className="sh">
          <h2
            className="disp"
            style={{ fontSize: "clamp(34px, 6vw, 90px)" }}
          >
            Follow the
            <br />
            latest drops
          </h2>
          <a
            className="btn l"
            target="_blank"
            rel="noopener noreferrer"
            href={IG}
          >
            @farfits.pk ↗
          </a>
        </div>
        <div className="masonry">
          {IG_TILES.map((tile) => (
            <a
              key={tile.src}
              href={IG}
              target="_blank"
              rel="noopener noreferrer"
              className="rv"
            >
              <Photo src={tile.src} alt={tile.alt} ratio={tile.ratio} />
            </a>
          ))}
        </div>
      </section>

      <Visit />
    </>
  );
}
