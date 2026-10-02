import Link from "next/link";
import { EditRow } from "@/components/EditRow";
import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { Visit } from "@/components/Visit";
import { IG } from "@/lib/constants";
import { products } from "@/lib/products";

const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/editorial/hero.jpg",
    alt: "White leather sneaker in low light",
    eyebrow: "Authentic Thrifted Footwear",
    line: "Curated. Authentic. Distinct.",
    cta: "Shop Collection",
    href: "/shop",
    position: "center 42%",
  },
  {
    src: "/editorial/hero-shoe.jpg",
    alt: "Editorial sneaker detail in soft light",
    eyebrow: "New Season Edit",
    line: "One of each. When it's gone, it's gone.",
    cta: "New Arrivals",
    href: "/new-arrivals",
    position: "center 48%",
  },
  {
    src: "/editorial/editorial-detail.jpg",
    alt: "Close detail of thrifted footwear",
    eyebrow: "Inspected Before Listing",
    line: "Character you can wear again.",
    cta: "Browse Sneakers",
    href: "/shop?c=Sneakers",
    position: "center 40%",
  },
];

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
      <HeroCarousel slides={HERO_SLIDES} />

      <div className="ticker lab">
        <div>
          {ticker.map((t, i) => (
            <span key={`${t}-${i}`}>{t}</span>
          ))}
        </div>
      </div>

      <section>
        <div className="sh rv">
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
        <EditRow>
          {edit.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              quickAdd={false}
              ratio={i % 3 === 0 ? "4/5" : "1/1"}
            />
          ))}
        </EditRow>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="sh rv">
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
        <div className="rv">
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
          className="rv"
          src="/editorial/editorial-detail.jpg"
          alt="Close detail of a perforated leather toe"
          ratio="3/4"
        />
      </section>

      <section>
        <div className="sh rv">
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
