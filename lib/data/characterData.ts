import type {
    Ability,
    Skills,
    Character,
    CharacterClass,
    SpecialSense,
    Conditions,
    ClassFeaturesList,
    Languages,
} from "@/lib/types/character";

export const specialSenses: Array<SpecialSense> = [
    'blindsight',
    'darkvision',
    'tremorsense',
    'truesight'
];
  
export const conditionsList: Conditions = {
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
  
export const characterClasseList: Array<CharacterClass> = [
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
];
  
export const classFeaturesList: ClassFeaturesList = {
    barbarian: {
      savingThrows: ['strength', 'constitution'],
      skillProficiencies: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival']
    },
    bard: {
      savingThrows: ['dexterity', 'charisma'],
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
      savingThrows: ['strength', 'dexterity'],
      skillProficiencies: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth']
    },
    paladin: {
      savingThrows: ['wisdom', 'charisma'],
      skillProficiencies: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion']
    },
    ranger: {
      savingThrows: ['strength', 'dexterity'],
      skillProficiencies: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival']
    },
    rogue: {
      savingThrows: ['dexterity', 'intelligence'],
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
  
export const abilities: Array<Ability> = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
];
  
export const languages: Languages = {
    common: true,
    commonSignLanguage: false,
    draconic: false,
    dwarvish: false,
    elvish: false,
    giant: false,
    gnomish: false,
    goblin: false,
    halfling: false,
    orc: false,
};
  
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
    },
    languages: languages
};
