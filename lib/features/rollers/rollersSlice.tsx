import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Dice } from "@/lib/features/dice/diceSlice";

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


let initialState: RollersSlice = {
    rollers: [
        {
          id: 0,
          name: 'input1',
          type: 'input',
          dice: {
              quantity: 1,
              sides: 20,
              modifier: 0
          }
        },
        {
            id: 1,
            name: 'd20',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 20,
                modifier: 0
            }
        },
        {
            id: 2,
            name: 'd12',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 12,
                modifier: 0
            }
        },
        {
            id: 3,
            name: 'd10',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 10,
                modifier: 0
            }
        },
        {
            id: 4,
            name: 'd8',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 8,
                modifier: 0
            }
        },
        {
            id: 5,
            name: 'd6',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 6,
                modifier: 0
            }
        },
        {
            id: 6,
            name: 'd4',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 4,
                modifier: 0
            }
        },
    ],
};

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
