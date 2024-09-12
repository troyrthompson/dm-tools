import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import { mergePreferences, loadPreferences } from "@/lib/persist";

export interface RollersSlice {
    widgetRows: [];
}

let initialState = {
  widgetRows: [
    ["Characters"],
    ["Senses", "Condition", "Languages"],
    ["Skills", "Abilities", "SavingThrows"],
  ]
}


export const widgetRowsSlice = createAppSlice({
  name: 'widgetRows',
  initialState,
  reducers: (create) => ({
    updateWidgetRows: create.reducer((state, action: PayloadAction<[]>) => {
        state.widgetRows = action.payload;
    },
    // addRollers: create.reducer((state, action: PayloadAction<Roller>) => {
    //     state.rollers.push(action.payload);
    //     mergePreferences({
    //       "rollers": state.rollers
    //     });
    // }),
    // updateRoller: create.reducer((state, action: PayloadAction<Roller>) => {
    //     state.rollers = state.rollers.map((roller) => {
    //       if (roller.id === action.payload.id) {
    //         let updatedRoller = {
    //           ...roller,
    //           ...action.payload,
    //         };
    //         return updatedRoller;
    //       }
    //       return roller;
    //     });
    //     mergePreferences({
    //       "rollers": state.rollers
    //     });
    //   }),
    //   moveRoller: create.reducer((state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
    //     const newRollers = [...state.rollers];
    //     const roller = newRollers[action.payload.fromIndex];
    //     newRollers.splice(action.payload.fromIndex, 1);
    //     newRollers.splice(action.payload.toIndex, 0, roller);
    //     state.rollers = newRollers;
    //     mergePreferences({
    //       "rollers": state.rollers
    //     });
    //   }),
    //   deleteRoller: create.reducer((state, action: PayloadAction<Roller>) => {
    //     state.rollers = state.rollers.filter((roller) => {
    //       return roller.id !== action.payload.id;
    //     });
    //     mergePreferences({
    //       "rollers": state.rollers
    //     });
    //   }),
  )}),
  selectors: {
    selectWidgetRows: (state) => state.widgetRows,
  },
});

export const { updateWidgetRows } = widgetRowsSlice.actions;

export const { selectWidgetRows } = widgetRowsSlice.selectors;
