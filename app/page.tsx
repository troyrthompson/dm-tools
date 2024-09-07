import type { Metadata } from "next";
import { Characters } from "./components/characters/Characters";

export default function IndexPage() {
  return (
   <>
    <Characters />
   </>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
