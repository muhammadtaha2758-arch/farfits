"use client";

import type { ReactNode } from "react";

/** Current Edit product row — horizontal snap on mobile, editorial grid on desktop. */
export function EditRow({ children }: { children: ReactNode }) {
  return <div className="edit">{children}</div>;
}
