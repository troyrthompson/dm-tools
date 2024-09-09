'use client';

import Link from 'next/link';

import { recordDiceRoll, rollDice } from '@/lib/features/dice/diceSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import type { Dice } from '@/lib/features/dice/diceSlice';
import { Button } from '../elements/Button';
import { SmallButton } from '../elements/SmallButton';

import getSkillsBonus from '@/lib/utils/character/getSkillsBonus';
import determineAbilityScoreModifier from '@/lib/utils/character/determineAbilityScoreModifier';
import getProficiencyBonus from '@/lib/utils/character/getProficiencyBonus';
import buildPassiveSensesObj from '@/lib/utils/character/buildPassiveSenseObj';

import { classFeaturesList } from '@/lib/features/characters/charactersSlice';

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

    function getAbilityScoreModifierString(score: string, bonus = 0) {
        let modifier: any = determineAbilityScoreModifier(score, bonus);
        if (modifier > 0) {
            modifier = `+${modifier}`;
        }
        return `${modifier}`;
    }

    function getCapitalizedString(str: string) {
        if (!str) {
            return '';
        }
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

    function handleSavingThrowClick(data: any, bonus) {
        const modifier = determineAbilityScoreModifier(data[1]) + bonus;
        const name = getCapitalizedString(data[0]);
        const dice: Dice = {
            quantity: 1,
            sides: 20,
            modifier:modifier,
            name: `${name} Saving Throw`
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

    function getSavingThrowBonus(savingThrow: string) {
        return classFeaturesList[character.general.class].savingThrows.includes(savingThrow) ? getProficiencyBonus(character.general.level) : 0;
    }
    
    function buildSkillList() {
        return skills.map((skill, i) => {
            const bonus = getSkillsBonus(skill[0], character);
            const skillRollNumber = determineAbilityScoreModifier(character.abilityScores[skill[1]], bonus);
            const skillRoll = getAbilityScoreModifierString(character.abilityScores[skill[1]], bonus);
            const name = skill[0];
            return (
                <div key={i}><div className="inline" onClick={() => handleSkillClick(name, skillRollNumber)}><SmallButton text={skillRoll}></SmallButton></div> {name}</div>
            )
        })
    }

    const buildPassiveSenses = () => {
        const passiveSensesObj = buildPassiveSensesObj(character);

        return (
            <>
                <div><span className="font-bold">{passiveSensesObj.Perception}</span> : Passive Perception</div>
                <div><span className="font-bold">{passiveSensesObj.Investigation}</span> : Passive Investigation</div>
                <div><span className="font-bold">{passiveSensesObj.Insight}</span> : Passive Insight</div>


            </>
        )
    }

    function showCondition(char) {
        return Object.entries(char.conditions).map((data: any, i: number) => {
            if (data[1] === false) {
                return '';
            }

            return (
                <div key={`${i}-general`}>{data[0]}</div>
            )
        })
    }

    function showNotes(char) {
         return char.notes;
    }

  return (
    <>
        <div className="flex flex-wrap gap-4 justify-center">
            <div className="p-8 rounded-xl shadow-lg">
                
                <h2 className="text-2xl mb-2 mt-0">General</h2>
                {Object.entries(character.general).map((data: any, i: number) => {
                    return (
                    <div key={`${i}-general`}>{getCapitalizedString(data[0])}: <span className="font-bold">{getCapitalizedString(data[1])}</span></div>
                    )
                })}
                <Link className="font-bold block mt-2" href={`/character/edit/?id=${character.id}`}><Button text='Edit Character'></Button></Link>
            </div>
            <div className="p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl mb-2 mt-0">Senses</h2>
                {buildPassiveSenses()}
                {Object.entries(character.specialSenses).map((data: any, i: number) => {
                    if (data[1] <= 0) {
                        return '';
                    }
                    return (
                        <div key={`${i}-specialSenses`}><span className="font-bold">{data[1]}</span> : <span>{data[0]}</span></div>
                    )
                })}
            </div>
            <div className="p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl mb-2 mt-0">Conditions</h2>
                {showCondition(character)}
            </div>
            <div className="p-8 rounded-xl shadow-lg max-w-72">
                <h2 className="text-2xl mb-2 mt-0">Notes</h2>
                {showNotes(character)}
            </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
            <div>
                <div className="p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl mb-2 mt-0">Ability Scores</h2>
                {Object.entries(character.abilityScores).map((data: any, i: number) => {
                    return (
                        <div className="flex justify-between" key={`${i}-ability-score`}><div onClick={() => handleAbilityScoreClick(data)}><SmallButton text={getAbilityScoreModifierString(data[1])} /></div> <span className="px-4">{getCapitalizedString(data[0])}</span> <span className="font-bold">{data[1]}</span></div>
                    )
                })}
                </div>
                <div className="p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl mb-2 mt-0">Saving Throws</h2>
                {Object.entries(character.abilityScores).map((data: any, i: number) => {
                    let savingThrowBonus = getSavingThrowBonus(data[0]);
                    return (
                        <div className="flex justify-between" key={`${i}-saving-throw`}><div onClick={() => handleSavingThrowClick(data, savingThrowBonus)}><SmallButton text={getAbilityScoreModifierString(data[1], savingThrowBonus)} /></div> <span className="px-4">{getCapitalizedString(data[0])}</span></div>
                    )
                })}
                </div>
            </div>
            <div className="p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl mb-2 mt-0">Skills</h2>
                {buildSkillList()}
            </div>
            
        </div>
    
    </>
  );
};
