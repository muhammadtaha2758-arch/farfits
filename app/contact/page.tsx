"use client";

import { FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { IG, SITE } from "@/lib/constants";

export default function ContactPage() {
  const { toast } = useCart();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    toast("Opening Instagram");
    window.open(IG, "_blank");
  }

  return (
    <section className="two-c">
      <div className="prose">
        <p className="lab">Contact</p>
        <h1 className="disp">
          Say
          <br />
          hello
        </h1>
        <p>
          Questions on sizing, condition or a pair you&apos;ve spotted? Message
          us on Instagram or visit the store.
        </p>
        <p>
          <a
            href={IG}
            target="_blank"
            rel="noopener noreferrer"
            style={{ borderBottom: "1px solid" }}
          >
            @farfits.pk
          </a>
        </p>
        <p>
          North Nazimabad, Block H
          <br />
          5 Star Food Street, Issa Laboratory Street
          <br />
          Karachi — {SITE.hours}
        </p>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <label className="lab">
          Name
          <input required autoComplete="name" />
        </label>
        <label className="lab">
          Email
          <input type="email" required autoComplete="email" />
        </label>
        <label className="lab">
          Message
          <textarea rows={5} required />
        </label>
        <button className="btn k" type="submit">
          Send →
        </button>
        <p className="mute" style={{ marginTop: 12, fontSize: 12 }}>
          Demo form — connect to your email/WhatsApp handler before launch.
        </p>
      </form>
    </section>
  );
}
