"use client";

import { Characters } from "@/components/characters/Characters";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { Senses } from "@/components/senses/Senses";
import { Condition } from "@/components/condition/Condition";
import { Skills } from "@/components/skills/Skills";
import { Abilities } from "@/components/abilities/Abilities";
import { SavingThrows } from "@/components/savingThrows/SavingThrows";

import { Languages } from "@/components/languages/Languages";

import NoSSRWrapper from "@/components/dynamicWrapper";

import { selectWidgetRows, updateWidgetRows } from "@/lib/features/widgetRows/widgetRowsSlice";

import Row from "@/components/layout/row";

export default function IndexPage() {
  const rows = useAppSelector(selectWidgetRows);

  const dispatch = useAppDispatch();

  function changeHandler(data, position) {
    let updatedRows = [...rows];
    updatedRows[position] = data;
    dispatch(updateWidgetRows(updatedRows));
  }

  return (
    <NoSSRWrapper>
      {rows.map((row, i) => {
        return (
          <Row data={row} position={i} changeHandler={changeHandler}/>
        )
      })}
   </NoSSRWrapper>
  );
}
