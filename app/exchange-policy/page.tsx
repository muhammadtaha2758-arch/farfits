export const metadata = {
  title: "Exchange Policy",
};

export default function ExchangePolicyPage() {
  return (
    <section>
      <div className="prose">
        <p className="lab">Policy</p>
        <h1 className="disp">
          Exchange
          <br />
          policy
        </h1>
        <p
          style={{
            font: "700 clamp(26px, 3vw, 40px)/1.05 var(--font-sans)",
            letterSpacing: "-0.03em",
            marginBottom: 30,
          }}
        >
          Exchange possible.
        </p>
        <p>
          If a pair isn&apos;t right, talk to us and we&apos;ll work out an
          exchange against other stock.
        </p>
        <h3 className="lab">Terms to confirm</h3>
        <p className="mute">
          Exchange window, condition requirements and refund rules — edit this
          section with FARFITS&apos; final terms before launch.
        </p>
        <h3 className="lab">Authenticity</h3>
        <p>
          Every pair is carefully selected and inspected before being listed.
        </p>
      </div>
    </section>
  );
}
