import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Dice } from "@/lib/features/dice/diceSlice";

import { mergePreferences, loadPreferences } from "@/lib/persist";

export interface RollersSlice {
    rollers: Array<Roller>;
}

export type RollerType = 'button' | 'input';

export type Roller = {
    id: number,
  name: string,
  type: RollerType,
  dice: Dice,
};


let initialState: RollersSlice = loadPreferences();

export const rollersSlice = createAppSlice({
  name: 'roller',
  initialState,
  reducers: (create) => ({
    addRollers: create.reducer((state, action: PayloadAction<Roller>) => {
        state.rollers.push(action.payload);
        mergePreferences({
          "rollers": state.rollers
        });
    }),
    updateRoller: create.reducer((state, action: PayloadAction<Roller>) => {
        state.rollers = state.rollers.map((roller) => {
          if (roller.id === action.payload.id) {
            let updatedRoller = {
              ...roller,
              ...action.payload,
            };
            return updatedRoller;
          }
          return roller;
        });
        mergePreferences({
          "rollers": state.rollers
        });
      }),
      moveRoller: create.reducer((state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
        const newRollers = [...state.rollers];
        const roller = newRollers[action.payload.fromIndex];
        newRollers.splice(action.payload.fromIndex, 1);
        newRollers.splice(action.payload.toIndex, 0, roller);
        state.rollers = newRollers;
        mergePreferences({
          "rollers": state.rollers
        });
      }),
      deleteRoller: create.reducer((state, action: PayloadAction<Roller>) => {
        state.rollers = state.rollers.filter((roller) => {
          return roller.id !== action.payload.id;
        });
        mergePreferences({
          "rollers": state.rollers
        });
      }),
  }),
  selectors: {
    selectRollers: (list) => list.rollers,
    getNextRollerId: (list) => list.rollers.length + 1,
  },
});

export const { addRollers, updateRoller, deleteRoller, moveRoller } = rollersSlice.actions;

export const { selectRollers, getNextRollerId } = rollersSlice.selectors;
