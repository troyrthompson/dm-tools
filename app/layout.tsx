import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import { RollList } from "./components/dice/RollList";

import "./styles/globals.css";
import { Roll } from "./components/dice/Roll";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body>
            <section className="container mx-auto relative min-h-screen flex content-between justify-between flex-col">
            <aside className="sm:fixed text-center sm:text-left p-3 top-0 left-0 bg-white rounded-xl shadow-lg mb-4">
              <RollList/>
            </aside>
            <aside className="sm:fixed max-w-none px-4 bottom-0 left-0">
            <Roll />
            </aside>
            <Nav />
            <main className="max-w-none px-4">{children}</main>
            <footer className="max-w-none px-4"></footer>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
