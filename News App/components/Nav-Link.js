"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLinks({ href, children }) {
  const params = usePathname();
  return (
    <Link
      href={href}
      className={params.startsWith(href) ? "active" : undefined}
    >
      {children}
    </Link>
  );
}
