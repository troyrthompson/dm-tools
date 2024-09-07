"use client";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

import { useAppDispatch } from "@/lib/hooks";

import { Button } from "../elements/Button";

export const ButtonRoller = ({roller, index}) => {

    const dispatch = useAppDispatch();

  return (
    <div key={index} onClick={() => {
        dispatch(recordDiceRoll(rollDice(roller.dice)));
    }}><Button text={roller.name}/></div>
  );
};
