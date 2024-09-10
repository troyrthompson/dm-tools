import type { Metadata } from "next";
import { Characters } from "./components/characters/Characters";

import { PassiveTracker } from "./components/senses/Senses";
import { Condition } from "./components/condition/Condition";
import { Skills } from "./components/skills/Skills";
import { Abilities } from "./components/abilities/Abilities";
import { SavingThrows } from "./components/savingThrows/SavingThrows";

import { Languages } from "./components/languages/Languages";

import NoSSRWrapper from "./components/dynamicWrapper";

export default function IndexPage() {
  return (
   <>
    <NoSSRWrapper>
      <Characters />
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      <Abilities />
      <SavingThrows />
      <Skills />
    </div>
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      <PassiveTracker />
      <Condition />
      <Languages />
    </div>
    </NoSSRWrapper>
   </>
  );
}

// export const metadata: Metadata = {
//   title: "Redux Toolkit",
// };
