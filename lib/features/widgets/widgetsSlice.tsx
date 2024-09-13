import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import { defaultCharacters } from "@/lib/data/defaultData";

const initialState = {
  widgets: defaultCharacters.widgets,
};

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
    },
  )}),
  selectors: {
    selectWidgets: (state) => state.widgets,
  },
});

export const { updateWidgets } = widgetsSlice.actions;

export const { selectWidgets } = widgetsSlice.selectors;
