import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { mergePreferences, loadPreferences } from "@/lib/persist";

export type Skill = 'Acrobatics' | 'Animal Handling' | 'Arcana' | 'Athletics' | 'Deception' | 'History' | 'Insight' | 'Intimidation' | 'Investigation' | 'Medicine' | 'Nature' | 'Perception' | 'Performance' | 'Persuasion' | 'Religion' | 'Sleight of Hand' | 'Stealth' | 'Survival';

export type characterClass = 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard';

export type Condition = 'blinded' | 'charmed' | 'deafened' | 'frightened' | 'grappled' | 'incapacitated' | 'invisible' | 'paralyzed' | 'petrified' | 'poisoned' | 'prone' | 'restrained' | 'stunned' | 'unconscious';

export type specialSense = 'blindsight' | 'darkvision' | 'tremorsense' | 'truesight';

export const specialSenses = [
  'blindsight',
  'darkvision',
  'tremorsense',
  'truesight'
];

export type SpecialSenses = {
  blindsight: number,
  darkvision: number,
  tremorsense: number,
  truesight: number
}

export const conditionsList = {
  blinded: false,
  charmed: false,
  deafened: false,
  frightened: false,
  grappled: false,
  incapacitated: false,
  invisible: false,
  paralyzed: false,
  petrified: false,
  poisoned: false,
  prone: false,
  restrained: false,
  stunned: false,
  unconscious: false
};

export const characterClasseList: Array<characterClass> = [
  'barbarian',
  'bard',
  'cleric',
  'druid',
  'fighter',
  'monk',
  'paladin',
  'ranger',
  'rogue',
  'sorcerer',
  'warlock',
  'wizard'
]

export const classFeaturesList = {
  barbarian: {
    savingThrows: ['strength', 'constitution'],
    skillProficiencies: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival']
  },
  bard: {
    savingThrows: ['dexerity', 'charisma'],
    skillProficiencies: [
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
      'Survival']
  },
  cleric: {
    savingThrows: ['wisdom', 'charisma'],
    skillProficiencies: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion']
  },
  druid: {
    savingThrows: ['intelligence', 'wisdom'],
    skillProficiencies: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival']
  },
  fighter: {
    savingThrows: ['strength', 'constitution'],
    skillProficiencies: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival']
  },
  monk: {
    savingThrows: ['strength', 'dexerity'],
    skillProficiencies: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth']
  },
  paladin: {
    savingThrows: ['wisdom', 'charisma'],
    skillProficiencies: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion']
  },
  ranger: {
    savingThrows: ['strength', 'dexerity'],
    skillProficiencies: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival']
  },
  rogue: {
    savingThrows: ['dexerity', 'intelligence'],
    skillProficiencies: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth']
  },
  sorcerer: {
    savingThrows: ['constitution', 'charisma'],
    skillProficiencies: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion']
  },
  warlock: {
    savingThrows: ['wisdom', 'charisma'],
    skillProficiencies: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion']
  },
  wizard: {
    savingThrows: ['intelligence', 'wisdom'],
    skillProficiencies: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion']
  }
}

export type CharacterGeneralAttributes = {
    name: string,
    race: string,
    class: characterClass,
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
  notes: string,
  conditions: {},
  specialSenses: SpecialSenses
};

export const skillList: Skills = [
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

export const abilities = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
]

export const skillListAbilities = {
  acrobatics: 'dexterity',
  animalHandling: 'wisdom',
  arcana: 'intelligence',
  athletics: 'strength',
  deception: 'charisma',
  history: 'intelligence',
  insight: 'wisdom',
  intimidation: 'charisma',
  investigation: 'intelligence',
  medicine: 'wisdom',
  nature: 'intelligence',
  perception: 'wisdom',
  performance: 'charisma',
  persuasion: 'charisma',
  religion: 'intelligence',
  sleightOfHand: 'dexterity',
  stealth: 'dexterity',
  survival: 'wisdom'
};

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
  notes: '',
  conditions: conditionsList,
  specialSenses: {
    blindsight: 0,
    darkvision: 0,
    tremorsense: 0,
    truesight: 0
  }
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
