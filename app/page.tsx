"use client";

import { useAppSelector } from "@/lib/hooks";

import { Characters } from "@/components/characters/Characters";
import { Senses } from "@/components/senses/Senses";
import { Condition } from "@/components/condition/Condition";
import { Skills } from "@/components/skills/Skills";
import { Abilities } from "@/components/abilities/Abilities";
import { SavingThrows } from "@/components/savingThrows/SavingThrows";

import { Languages } from "@/components/languages/Languages";

import NoSSRWrapper from "@/components/dynamicWrapper";

import { selectWidgets } from "@/lib/features/widgets/widgetsSlice";

const componentMapping = {
  Characters,
  Senses,
  Condition,
  Languages,
  Skills,
  Abilities,
  SavingThrows,
}

export default function IndexPage() {

  const rows = useAppSelector(selectWidgets);

  return (
   <>
    <NoSSRWrapper>
      <Characters />
    {rows.map((row, i) => {
      return (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {row.map((component, j) => {
            const componentName = component.split("-")[0];
            const Component = componentMapping[componentName];
            return (
              < Component />
            )
          })}
        </div>
      )
    })}
    </NoSSRWrapper>
   </>
  );
}
