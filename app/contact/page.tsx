"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { IG, SITE } from "@/lib/constants";

export default function ContactPage() {
  const { toast } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const body = [
      `Hi FARFITS — message from the site:`,
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(body);
      toast("Message copied — opening Instagram");
    } catch {
      toast("Opening Instagram");
    }
    window.open(IG, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="two-c">
      <div className="prose rv">
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
      <form className="form rv" onSubmit={onSubmit}>
        <label className="lab">
          Name
          <input
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="lab">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="lab">
          Message
          <textarea
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button className="btn k" type="submit">
          Send via Instagram →
        </button>
        <p className="mute" style={{ marginTop: 12, fontSize: 12 }}>
          Copies your message, then opens @farfits.pk so you can paste and send.
        </p>
      </form>
    </section>
  );
}
