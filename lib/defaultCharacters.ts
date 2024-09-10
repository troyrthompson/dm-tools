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
export const defaultCharacters = {
    rollers: [
        {
        id: 0,
        name: 'input1',
        type: 'input',
        dice: {
            quantity: 1,
            sides: 20,
            modifier: 0
        }
        },
        {
            id: 1,
            name: 'd20',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 20,
                modifier: 0
            }
        },
        {
            id: 2,
            name: 'd12',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 12,
                modifier: 0
            }
        },
        {
            id: 3,
            name: 'd10',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 10,
                modifier: 0
            }
        },
        {
            id: 4,
            name: 'd8',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 8,
                modifier: 0
            }
        },
        {
            id: 5,
            name: 'd6',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 6,
                modifier: 0
            }
        },
        {
            id: 6,
            name: 'd4',
            type: 'button',
            dice: {
                quantity: 1,
                sides: 4,
                modifier: 0
            }
        },
    ],
    characters: [{
        id: 1,
        general: {
            name: 'John',
            race: 'human',
            class: 'fighter',
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
            'Athletics',
            'Intimidation'
        ],
        notes: '',
        conditions: {
            blinded: true,
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
        },
        specialSenses: {
            blindsight: 30,
            darkvision: 0,
            tremorsense: 0,
            truesight: 0
        },
        languages: {
            common: true,
            commonSignLanguage: false,
            draconic: false,
            dwarvish: false,
            elvish: false,
            giant: false,
            gnomish: false,
            goblin: true,
            halfling: false,
            orc: false,
        }
    },{
        id: 2,
        general: {
            name: 'Jane',
            race: 'elf',
            class: 'wizard',
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
            'Insight',
            'Arcana'
        ],
        notes: '',
        conditions: conditionsList,
        specialSenses: {
            blindsight: 0,
            darkvision: 0,
            tremorsense: 0,
            truesight: 0
        },
        languages: {
            common: true,
            commonSignLanguage: false,
            draconic: false,
            dwarvish: false,
            elvish: true,
            giant: false,
            gnomish: false,
            goblin: false,
            halfling: false,
            orc: false,
        }
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
            'History',
            'Religion'
        ],
        notes: '',
        conditions: conditionsList,
        specialSenses: {
            blindsight: 0,
            darkvision: 0,
            tremorsense: 0,
            truesight: 0
        },
        languages: {
            common: true,
            commonSignLanguage: false,
            draconic: false,
            dwarvish: true,
            elvish: false,
            giant: false,
            gnomish: false,
            goblin: false,
            halfling: false,
            orc: false,
        }
        
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
        notes: 'Blessing of the Trickster',
        skillProficiencies: [
            'Sleight of Hand',
            'Persuasion'
        ],
        conditions: conditionsList,
        specialSenses: {
            blindsight: 0,
            darkvision: 60,
            tremorsense: 0,
            truesight: 0
        },
        languages: {
            common: true,
            commonSignLanguage: true,
            draconic: false,
            dwarvish: false,
            elvish: false,
            giant: false,
            gnomish: false,
            goblin: false,
            halfling: false,
            orc: false,
        }
    }],
};