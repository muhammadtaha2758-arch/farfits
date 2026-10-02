import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Visit } from "@/components/Visit";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <section style={{ paddingBottom: 0 }}>
        <p className="lab">About FARFITS</p>
        <h1
          className="disp"
          style={{
            fontSize: "clamp(50px, 12vw, 200px)",
            margin: "24px 0",
          }}
        >
          Authentic
          <br />
          footwear.
          <br />
          <span className="serif" style={{ textTransform: "none" }}>
            Curated differently.
          </span>
        </h1>
      </section>
      <section className="two-c" style={{ alignItems: "start" }}>
        <Photo
          src="/editorial/editorial-shelf.jpg"
          alt="A row of selected shoes on a plaster shelf"
          ratio="4/5"
        />
        <div className="prose" style={{ paddingTop: "5vw" }}>
          <p
            style={{
              fontSize: "clamp(20px, 2vw, 28px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            FARFITS is an authentic thrift shoe store built around carefully
            selected footwear, distinctive finds, and pieces worth wearing
            again.
          </p>
          <p className="mute" style={{ marginTop: 20 }}>
            Every pair is selected with attention to authenticity, condition,
            and character. We list one of each, say plainly what condition
            it&apos;s in, and offer exchanges if it isn&apos;t right.
          </p>
          <Link className="btn k" style={{ marginTop: 30 }} href="/shop">
            Shop collection →
          </Link>
        </div>
      </section>
      <Visit />
    </>
  );
}
