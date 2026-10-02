import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1 className="disp">Not found</h1>
      <Link className="btn l" href="/shop" style={{ marginTop: 30 }}>
        Back to shop
      </Link>
    </section>
  );
}
