import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "@/components/Nav";

import { RollList } from "@/components/dice/RollList";

import "./styles/globals.css";
import { Roll } from "@/components/dice/Roll";

import NoSSRWrapper from "@/components/dynamicWrapper";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body className="bg-slate-50">
            <aside className="z-10 sm:fixed top-2 left-2">
              <RollList/>
            </aside>
            <aside className="z-10 sm:fixed max-w-none px-3 py-2 bottom-0 left-0">
              <NoSSRWrapper>
                <Roll />
              </NoSSRWrapper>
            </aside>
            <section className="z-0 container mx-auto relative min-h-screen flex content-between justify-between flex-col">
            <Nav />
            <main className="max-w-none px-4">{children}</main>
            <footer className="max-w-none px-4"></footer>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
