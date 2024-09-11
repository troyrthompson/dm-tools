import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { mergePreferences, loadPreferences } from "@/lib/persist";
import type { Character } from "@/lib/types/character";

export interface CharactersSlice {
  characters: Array<Character>;
}

const initialState: CharactersSlice = loadPreferences();
  
export const charactersSlice = createAppSlice({
  name: 'characters',
  initialState,
  reducers: (create) => ({
    addCharacter: create.reducer((state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
      mergePreferences({
        "characters": state.characters
      });
    }),
    deleteCharacter: create.reducer((state, action: PayloadAction<Character>) => {
      state.characters = state.characters.filter((character) => {
        return character.id !== action.payload.id;
      });
      mergePreferences({
        "characters": state.characters
      });
    }),
    updateCharacter: create.reducer((state, action: PayloadAction<Character>) => {
      state.characters = state.characters.map((character) => {
        if (character.id === action.payload.id) {
          let updatedCharacter = {
            ...character,
            ...action.payload,
          };
          return updatedCharacter;
        }
        return character;
      });
      mergePreferences({
        "characters": state.characters
      });
    }),
  }),
  selectors: {
    selectCharacters: (list) => list.characters,
    selectCharacterById: (list, id) => {
      const charById = list.characters.filter((character) => {
        return character.id === id;
      });
      return charById[0];
    },
    getNextCharacterId: (list) => list.characters.length + 1,
  },
});

export const { addCharacter, deleteCharacter, updateCharacter } = charactersSlice.actions;

export const { selectCharacters, selectCharacterById, getNextCharacterId } = charactersSlice.selectors;
