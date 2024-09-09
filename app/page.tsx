import type { Metadata } from "next";
import { Characters } from "./components/characters/Characters";

import { PassiveTracker } from "./components/passive/PassiveSensesTracker";
import { Condition } from "./components/condition/Condition";

export default function IndexPage() {
  return (
   <>
    <Characters />
    <div className="flex justify-center">
      <div className="mr-2">
        <PassiveTracker />
      </div>
      <Condition />
    </div>
   </>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
