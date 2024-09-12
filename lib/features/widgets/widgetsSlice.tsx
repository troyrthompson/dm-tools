import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import { mergePreferences, loadPreferences } from "@/lib/persist";

const initialState = loadPreferences();

export type Widget = 'Senses' |'Condition' | 'Languages' | 'Skills' | 'Abilities' | 'SavingThrows';

export type WidgetRowType = Array<Widget>;

export interface WidgetsSlice {
  widgets: Array<WidgetRowType>;
}

export const widgetsSlice = createAppSlice({
  name: 'widgets',
  initialState,
  reducers: (create) => ({
    updateWidgets: create.reducer((state, action: PayloadAction<WidgetRowType>) => {
        state.widgets = action.payload;
        mergePreferences({
          "widgets": state.widgets
        });
    },
  )}),
  selectors: {
    selectWidgets: (state) => state.widgets,
  },
});

export const { updateWidgets } = widgetsSlice.actions;

export const { selectWidgets } = widgetsSlice.selectors;
