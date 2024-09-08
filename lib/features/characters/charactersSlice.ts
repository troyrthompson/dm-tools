import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { mergePreferences, loadPreferences } from "@/lib/persist";

export type Skill = 'Acrobatics' | 'Animal Handling' | 'Arcana' | 'Athletics' | 'Deception' | 'History' | 'Insight' | 'Intimidation' | 'Investigation' | 'Medicine' | 'Nature' | 'Perception' | 'Performance' | 'Persuasion' | 'Religion' | 'Sleight of Hand' | 'Stealth' | 'Survival';

export type CharacterGeneralAttributes = {
    name: string,
    race: string,
    class: string,
    level: number,
    maxHitPoints: number,
    hitPoints: number,
}

export type Skills = Array<Skill>;

export type CharacterAbilityScoresAttributes = {
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number
}

export type Character = {
  id: number,
  general: CharacterGeneralAttributes,
  abilityScores: CharacterAbilityScoresAttributes,
  skillProficiencies: Skills,
};

export const skillList = [
  'Acrobatics',
  'Animal Handling',
  'Arcana',
  'Athletics',
  'Deception',
  'History',
  'Insight',
  'Intimidation',
  'Investigation',
  'Medicine',
  'Nature',
  'Perception',
  'Performance',
  'Persuasion',
  'Religion',
  'Sleight of Hand',
  'Stealth',
  'Survival'
];

export const defaultCharacter: Character = {
  id: 0,
  general: {
    name: 'new name',
    race: 'human',
    class: 'barbarian',
    level: 1,
    maxHitPoints: 20,
    hitPoints: 20,
  },
  abilityScores: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  },
  skillProficiencies: [
    'Acrobatics',
    'Survival'
  ],
};

export function parseCharacterProperties(character: Character) {
  // Remove id from the list of properties, gather all the properties that are objects
  let propertyEntries =  Object.entries(character).filter(([key,val]) => {
    if (val instanceof Object) {
      return true;
    }
  });

  let formattedProperties: Array<any> = [];

  propertyEntries.forEach(([key, val]) => {
    if (val instanceof Object) {
      let formattedNestedProperties: Array<any> = [];
      formattedProperties.push([key, formattedNestedProperties]);
      Object.entries(val).forEach(([key, val]) => {
        formattedNestedProperties.push([key, val]);
      });
    }
  });

  return formattedProperties;
}

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
      // mergePreferences({
      //   "characters": state.characters
      // });
    }),
    deleteCharacter: create.reducer((state, action: PayloadAction<Character>) => {
      state.characters = state.characters.filter((character) => {
        return character.id !== action.payload.id;
      });
      // mergePreferences({
      //   "characters": state.characters
      // });
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
      // mergePreferences({
      //   "characters": state.characters
      // });
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
