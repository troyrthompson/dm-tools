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
            <Nav />
            <main className="prose lg:prose-xl max-w-none px-4">{children}</main>

            <aside className="prose fixed p-3 bottom-0 right-0 bg-white">
              <RollList/>
            </aside>

            <footer className="prose lg:prose-xl max-w-none px-4">
            <Roll />
            </footer>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
