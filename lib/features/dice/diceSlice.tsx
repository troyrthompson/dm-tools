import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DiceRoll } from "@/lib/types/dice";

export interface DiceSlice {
    rollHistory: Array<DiceRoll>;
}

let initialState: DiceSlice = {
    rollHistory: [],
};

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
