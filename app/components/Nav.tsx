"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/layout.module.css";

export const Nav = () => {
  const pathname = usePathname();

  return (
    //{`${styles.link} ${pathname === "/" ? styles.active : ""}`}
    <nav className="flex justify-center py-2">
      <Link className="px-2 py-1 text-lg font-bold" href="/">
        Home
      </Link>
      <Link className="px-2 py-1 text-lg font-bold" href="/characters">
        Characters
      </Link>
      <Link className="px-2 py-1 text-lg font-bold" href="/rollers">
        Rollers
      </Link>
    </nav>
  );
};
