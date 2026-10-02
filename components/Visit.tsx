import { StoreMap } from "@/components/StoreMap";
import { MAP, SITE } from "@/lib/constants";

export function Visit() {
  return (
    <section className="visit">
      <div>
        <p className="lab" style={{ marginBottom: 24 }}>
          Store
        </p>
        <h2 className="disp">
          Visit
          <br />
          FARFITS
        </h2>
        <address>
          {SITE.address.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </address>
        <p className="lab" style={{ margin: "30px 0 4px" }}>
          Hours
        </p>
        <p
          style={{
            font: "700 26px var(--font-sans)",
            letterSpacing: "-0.03em",
          }}
        >
          {SITE.hours}
        </p>
        <a
          className="btn k"
          style={{ marginTop: 34 }}
          target="_blank"
          rel="noopener noreferrer"
          href={MAP}
        >
          Get directions <span>↗</span>
        </a>
      </div>
      <StoreMap />
    </section>
  );
}
