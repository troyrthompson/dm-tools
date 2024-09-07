'use client';

import { recordDiceRoll, rollDice } from '@/lib/features/dice/diceSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import type { Dice } from '@/lib/features/dice/diceSlice';

const skills = [
    ['Acrobatics', 'dexterity'],
    ['Animal Handling', 'wisdom'],
    ['Arcana', 'intelligence'],
    ['Athletics', 'strength'],
    ['Deception', 'charisma'],
    ['History', 'intelligence'],
    ['Insight', 'wisdom'],
    ['Intimidation', 'charisma'],
    ['Investigation', 'intelligence'],
    ['Medicine', 'wisdom'],
    ['Nature', 'intelligence'],
    ['Perception', 'wisdom'],
    ['Performance', 'charisma'],
    ['Persuasion', 'charisma'],
    ['Religion', 'intelligence'],
    ['Sleight of Hand', 'dexterity'],
    ['Stealth', 'dexterity'],
    ['Survival', 'wisdom']
];

export const ViewCharacterSheet = ({ character }) => {
    const dispatch = useAppDispatch();

    function determineAbilityScoreModifier(score: string, bonus = 0) {
        return Math.floor((parseInt(score) - 10) / 2) + bonus;
    }

    function getAbilityScoreModifierString(score: string, bonus = 0) {
        let modifier: any = determineAbilityScoreModifier(score, bonus);
        if (modifier > 0) {
            modifier = `+${modifier}`;
        }
        return `${modifier}`;
    }

    function getCapitalizedString(str: string) {
        if (parseInt(str)) {
            return str;
        }
        return str[0].toUpperCase() + str.slice(1);
    }
    
    function handleAbilityScoreClick(data: any) {
        const modifier = determineAbilityScoreModifier(data[1]);
        const name = getCapitalizedString(data[0]);
        const dice: Dice = {
            quantity: 1,
            sides: 20,
            modifier:modifier,
            name: `${name} Check`
        }

        dispatch(recordDiceRoll(rollDice(dice)));
    }

    function handleSkillClick(skillName, skillRollNumber) {
        const dice: Dice = {
            quantity: 1,
            sides: 20,
            modifier: skillRollNumber,
            name: `${skillName} Check`
        }

        dispatch(recordDiceRoll(rollDice(dice)));
    }

    function getProficiencyBonus(level: number) {
        return Math.ceil(level / 4) + 1;
    }

    function getSkillsBonus(skill: string) {
        return character.skillProficiencies.includes(skill) ? getProficiencyBonus(character.general.level) : 0;
    }
    
    function buildSkillList() {
        return skills.map((skill, i) => {
            const bonus = getSkillsBonus(skill[0]);
            const skillRollNumber = determineAbilityScoreModifier(character.abilityScores[skill[1]], bonus);
            const skillRoll = getAbilityScoreModifierString(character.abilityScores[skill[1]], bonus);
            const name = skill[0];
            return (
                <div key={i}><button className="text-white bg-gradient-to-r w-12 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-small rounded-xl text-sm px-3 py-1 text-center me-1 mb-1" onClick={() => handleSkillClick(name, skillRollNumber)}>{skillRoll}</button> {name}</div>
            )
        })
    }

  return (
    <>
        <div className="flex flex-wrap gap-4">
            <div className="p-8 rounded-xl shadow-lg">
                <h2 className="mt-0">General</h2>
                {Object.entries(character.general).map((data: any, i: number) => {
                    return (
                    <div key={`${i}-general`}>{getCapitalizedString(data[0])}: <span className="font-bold">{getCapitalizedString(data[1])}</span></div>
                    )
                })}
            </div>
            <div className="p-8 rounded-xl shadow-lg">
                <h2 className="mt-0">Ability Scores</h2>
                {Object.entries(character.abilityScores).map((data: any, i: number) => {
                    return (
                        <div key={`${i}-ability-score`}><button className="text-white bg-gradient-to-r w-12 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-small rounded-xl text-sm px-3 py-1 text-center me-1 mb-1" onClick={() => handleAbilityScoreClick(data)}>{getAbilityScoreModifierString(data[1])}</button> {getCapitalizedString(data[0])}: <span className="font-bold">{data[1]}</span></div>
                    )
                })}
            </div>
        </div>
        <div className="flex flex-wrap gap-4">
            <div className="p-8 rounded-xl shadow-lg">
                {buildSkillList()}
            </div>
        </div>
    
    </>
  );
};
