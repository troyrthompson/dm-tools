import type { Metadata } from "next";
import { Characters } from "./components/characters/Characters";
import { Roll } from "./components/dice/Roll";

export default function IndexPage() {
  return (
   <>
    <Characters />
    <Roll />
   </>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
