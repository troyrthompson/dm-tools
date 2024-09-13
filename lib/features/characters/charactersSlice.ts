import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Character } from "@/lib/types/character";

import { defaultCharacters } from "@/lib/data/defaultData";

export interface CharactersSlice {
  characters: Array<Character>;
}

const initialState: CharactersSlice = {
  characters: defaultCharacters.characters,
};
  
export const charactersSlice = createAppSlice({
  name: 'characters',
  initialState,
  reducers: (create) => ({
    addCharacter: create.reducer((state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    }),
    deleteCharacter: create.reducer((state, action: PayloadAction<Character>) => {
      state.characters = state.characters.filter((character) => {
        return character.id !== action.payload.id;
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
