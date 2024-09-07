"use client";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

import { useAppDispatch } from "@/lib/hooks";

export const ButtonRoller = ({roller, index}) => {

    const dispatch = useAppDispatch();

  return (
    <button key={index} onClick={() => {
        dispatch(recordDiceRoll(rollDice(roller.dice)));
    }}>{roller.name}</button>
  );
};
