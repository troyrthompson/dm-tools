"use client";

import { recordDiceRoll } from "@/lib/features/dice/diceSlice";

import { rollDice } from "@/lib/utils/diceUtils";

import { useAppDispatch } from "@/lib/hooks";

import { SmallButton } from "../elements/SmallButton";

export const ButtonRoller = ({roller, index}) => {

    const dispatch = useAppDispatch();

  return (
    <div key={index} onClick={() => {
        dispatch(recordDiceRoll(rollDice(roller.dice)));
    }}><SmallButton text={roller.name}/></div>
  );
};
