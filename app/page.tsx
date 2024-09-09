import type { Metadata } from "next";
import { Characters } from "./components/characters/Characters";

import { PassiveTracker } from "./components/passive/PassiveSensesTracker";

export default function IndexPage() {
  return (
   <>
    <Characters />
    <PassiveTracker />
   </>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
