export type Ability = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export type CharacterClass = 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard';

export type Skill = 'Acrobatics' | 'Animal Handling' | 'Arcana' | 'Athletics' | 'Deception' | 'History' | 'Insight' | 'Intimidation' | 'Investigation' | 'Medicine' | 'Nature' | 'Perception' | 'Performance' | 'Persuasion' | 'Religion' | 'Sleight of Hand' | 'Stealth' | 'Survival';
export type Skills = Array<Skill>;

export type Condition = 'blinded' | 'charmed' | 'deafened' | 'frightened' | 'grappled' | 'incapacitated' | 'invisible' | 'paralyzed' | 'petrified' | 'poisoned' | 'prone' | 'restrained' | 'stunned' | 'unconscious';
export type Conditions = {
    [key in Condition]: boolean;
}

export type SpecialSense = 'blindsight' | 'darkvision' | 'tremorsense' | 'truesight';
export type SpecialSenses = {
    [key in SpecialSense]: number;
}

export type Language = 'common' | 'commonSignLanguage' | 'draconic' | 'dwarvish' | 'elvish' | 'giant' | 'gnomish' | 'goblin' | 'halfling' | 'orc';
export type Languages = {
    [key in Language]: boolean;
}

export type CharacterGeneralAttributes = {
    name: string,
    race: string,
    class: characterClass,
    level: number,
    maxHitPoints: number,
    hitPoints: number,
}

export type CharacterAbilityScoresAttributes = {
    [key in Ability]: number;
}

export type Character = {
  id: number,
  general: CharacterGeneralAttributes,
  abilityScores: CharacterAbilityScoresAttributes,
  skillProficiencies: Skills,
  notes: string,
  conditions: Conditions,
  specialSenses: SpecialSenses,
  languages: {}
};

export type ClassFeaturesList = {
    [key in CharacterClass]: {
        savingThrows: Array<Ability>,
        skillProficiencies: Skills
    }
}
