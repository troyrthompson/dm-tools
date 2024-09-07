import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DiceSlice {
    rollHistory: Array<DiceRoll>;
}

export type Dice = {
  quantity: number;
  sides: number;
  modifier: number;
};

export type DiceRoll = {
  quantity: number;
  sides: number;
  modifier: number;
  results: Array<number>;
  total: number;
};

let initialState: DiceSlice = {
    rollHistory: [],
};

export function rollDice(dice: Dice): DiceRoll { 
  let total = 0;
  const resultsArray = [] as Array<number>;
  for (let i = 0; i < dice.quantity; i++) {
    let result = Math.floor(Math.random() * dice.sides) + 1;
    resultsArray.push(result);
    total += result;
  }

  const diceRoll: DiceRoll = {
    quantity: dice.quantity,
    sides: dice.sides,
    modifier: dice.modifier,
    results: resultsArray,
    total: total + dice.modifier,
  }

  return diceRoll;
}

export const diceSlice = createAppSlice({
  name: 'dice',
  initialState,
  reducers: (create) => ({
    recordDiceRoll: create.reducer((state, action: PayloadAction<DiceRoll>) => {
        state.rollHistory.push(action.payload);
    }),
  }),
  selectors: {
    selectRollHistory: (list) => list.rollHistory,
  },
});

export const { recordDiceRoll } = diceSlice.actions;

export const { selectRollHistory } = diceSlice.selectors;
