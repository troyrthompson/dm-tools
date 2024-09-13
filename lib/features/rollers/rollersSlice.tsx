import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import { mergePreferences, loadPreferences } from "@/lib/persist";

import { defaultCharacters } from "@/lib/data/defaultData";

import type { Roller } from "@/lib/types/rollers";

export interface RollersSlice {
    rollers: Array<Roller>;
}

let initialState: RollersSlice = {
  rollers: defaultCharacters.rollers,
}

export const rollersSlice = createAppSlice({
  name: 'roller',
  initialState,
  reducers: (create) => ({
    addRollers: create.reducer((state, action: PayloadAction<Roller>) => {
        state.rollers.push(action.payload);
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
      }),
      moveRoller: create.reducer((state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
        const newRollers = [...state.rollers];
        const roller = newRollers[action.payload.fromIndex];
        newRollers.splice(action.payload.fromIndex, 1);
        newRollers.splice(action.payload.toIndex, 0, roller);
        state.rollers = newRollers;
      }),
      deleteRoller: create.reducer((state, action: PayloadAction<Roller>) => {
        state.rollers = state.rollers.filter((roller) => {
          return roller.id !== action.payload.id;
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
