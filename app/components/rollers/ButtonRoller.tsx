"use client";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

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
