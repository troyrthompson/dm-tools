import { CharactersSlice } from './features/characters/charactersSlice';

export const defaultCharacters: CharactersSlice = {
    characters: [{
        id: 1,
        general: {
            name: 'John',
            race: 'human',
            class: 'warrior',
            level: 1
        },
        abilityScores: {
            strength: 10,
            dexterity: 12,
            constitution: 14,
            intelligence: 16,
            wisdom: 18,
            charisma: 20
        },
        skillProficiencies: [
            'Acrobatics',
            'Survival'
        ]
    },{
        id: 2,
        general: {
            name: 'Jane',
            race: 'elf',
            class: 'mage',
            level: 2
        },
        abilityScores: {
            strength: 10,
            dexterity: 12,
            constitution: 14,
            intelligence: 16,
            wisdom: 18,
            charisma: 20
        },
        skillProficiencies: [
            'Acrobatics',
            'Survival'
        ]
    }],
};