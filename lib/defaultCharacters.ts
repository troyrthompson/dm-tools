import { CharactersSlice } from './features/characters/charactersSlice';

export const defaultCharacters: CharactersSlice = {
    characters: [{
        id: 1,
        general: {
            name: 'John',
            race: 'human',
            class: 'warrior',
            level: 1,
            maxHitPoints: 24,
            hitPoints: 20,
        },
        abilityScores: {
            strength: 16,
            dexterity: 14,
            constitution: 16,
            intelligence: 8,
            wisdom: 10,
            charisma: 10
        },
        skillProficiencies: [
            'Acrobatics',
            'Survival'
        ],
        savingThrowProficiencies: [
            'Strength',
            'Constitution'
        ]
    },{
        id: 2,
        general: {
            name: 'Jane',
            race: 'elf',
            class: 'mage',
            level: 2,
            maxHitPoints: 24,
            hitPoints: 18,
        },
        abilityScores: {
            strength: 8,
            dexterity: 10,
            constitution: 10,
            intelligence: 18,
            wisdom: 18,
            charisma: 12
        },
        skillProficiencies: [
            'Acrobatics',
            'Survival'
        ], 
        savingThrowProficiencies: [
            'Intelligence',
            'Wisdom'
        ]
    }, {
        id: 3,
        general: {
            name: 'Smithy',
            race: 'dwarf',
            class: 'cleric',
            level: 3,
            maxHitPoints: 17,
            hitPoints: 17,
        },
        abilityScores: {
            strength: 12,
            dexterity: 8,
            constitution: 12,
            intelligence: 12,
            wisdom: 18,
            charisma: 10
        },
        skillProficiencies: [
            'Insight',
            'Animal Handling'
        ], 
        savingThrowProficiencies: [
            'Constitution',
            'Wisdom'
        ]
    }, {
        id: 4,
        general: {
            name: 'Digner',
            race: 'human',
            class: 'rogue',
            level: 2,
            maxHitPoints: 12,
            hitPoints: 12,
        },
        abilityScores: {
            strength: 10,
            dexterity: 18,
            constitution: 8,
            intelligence: 10,
            wisdom: 10,
            charisma: 14
        },
        skillProficiencies: [
            'Sleight of Hand',
            'Persuasion'
        ], 
        savingThrowProficiencies: [
            'Dexterity',
            'Charisma'
        ]
    }],
};