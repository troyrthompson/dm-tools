import type { Metadata } from "next";
import { Characters } from "./components/characters/Characters";

import { PassiveTracker } from "./components/passive/PassiveSensesTracker";
import { Condition } from "./components/condition/Condition";
import { Skills } from "./components/skills/Skills";
import { Abilities } from "./components/abilities/Abilities";
import { SavingThrows } from "./components/savingThrows/SavingThrows";

import { Languages } from "./components/languages/Languages";

export default function IndexPage() {
  return (
   <>
    <Characters />
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      <Abilities />
      <SavingThrows />
      <Skills />
    </div>
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      <PassiveTracker />
      <Condition />
      <Languages />
    </div>
   </>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
