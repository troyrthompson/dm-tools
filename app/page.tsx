import type { Metadata } from "next";
import { Characters } from "./components/characters/Characters";

import { PassiveTracker } from "./components/passive/PassiveSensesTracker";
import { Condition } from "./components/condition/Condition";
import { Skills } from "./components/skills/Skills";
import { Abilities } from "./components/abilities/Abilities";
import { SavingThrows } from "./components/savingThrows/SavingThrows";

export default function IndexPage() {
  return (
   <>
    <Characters />
    <div className="flex flex-wrap justify-center">
      <div className="mr-2">
        <PassiveTracker />
      </div>
      <div className="mr-2">
        <Condition />
      </div>
      <div className="mr-2">
        <Abilities />
      </div>
      <div className="mr-2">
        <SavingThrows />
      </div>
      <Skills />
    </div>
   </>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
