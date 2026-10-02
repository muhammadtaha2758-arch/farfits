import Link from "next/link";
import { IG, MAP, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="fg">
        <div>
          <Link className="logo" href="/" style={{ color: "#fff", padding: 0 }}>
            <span className="mono">F</span>
            {SITE.name}
          </Link>
          <p className="lab" style={{ marginTop: 18 }}>
            Authentic Thrift Footwear
          </p>
          <p className="mute" style={{ marginTop: 4 }}>
            {SITE.city}
          </p>
        </div>
        <div>
          <p className="lab mute" style={{ marginBottom: 10 }}>
            Browse
          </p>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <p className="lab mute" style={{ marginBottom: 10 }}>
            Help
          </p>
          <Link href="/exchange-policy">Exchange policy</Link>
          <a href={MAP} target="_blank" rel="noopener noreferrer">
            Store location
          </a>
        </div>
        <div>
          <p className="lab mute" style={{ marginBottom: 10 }}>
            Social
          </p>
          <a href={IG} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="big disp" aria-hidden="true">
        {SITE.name}
      </div>
      <div className="fb lab">
        <span>© 2026 FARFITS · farfits.pk</span>
        <span>
          Developed by{" "}
          <a
            className="credit"
            href="https://rohtiqlabs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rohtiq Labs
          </a>
        </span>
      </div>
    </footer>
  );
}
