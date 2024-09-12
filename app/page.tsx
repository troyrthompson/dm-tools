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

import { selectWidgetRows } from "@/lib/features/widgetRows/widgetRowsSlice";

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

  const rows = useAppSelector(selectWidgetRows);

  console.log(rows, "rows");
  return (
   <>
    <NoSSRWrapper>
    {rows.map((row, i) => {
      console.log(row, "row")
      return (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {row.map((component, j) => {
            const Component = componentMapping[component];
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

// export const metadata: Metadata = {
//   title: "Redux Toolkit",
// };
