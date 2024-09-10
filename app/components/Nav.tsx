"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  return (
    //{`${styles.link} ${pathname === "/" ? styles.active : ""}`}
    <nav className="flex justify-center py-2">
      <Link className="text-gray-900 rounded-2xl bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" href="/">
        Overview
      </Link>
      <Link className="text-gray-900 rounded-2xl bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" href="/characters">
        Characters
      </Link>
      <Link className="text-gray-900 rounded-2xl bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" href="/rollers">
        Rollers
      </Link>
    </nav>
  );
};
