'use client';

import Link from 'next/link';

import { useAppDispatch } from '@/lib/hooks';

import { classFeaturesList } from '@/lib/features/characters/charactersSlice';
import { recordDiceRoll, rollDice } from '@/lib/features/dice/diceSlice';

import type { Dice } from '@/lib/features/dice/diceSlice';

import { Button } from '../elements/Button';
import { SmallButton } from '../elements/SmallButton';
import { CharacterAttributeContainer } from '../elements/CharacterAttributeContainer';

import getSkillsBonus from '@/lib/utils/character/getSkillsBonus';
import determineAbilityScoreModifier from '@/lib/utils/character/determineAbilityScoreModifier';
import getProficiencyBonus from '@/lib/utils/character/getProficiencyBonus';
import buildPassiveSensesObj from '@/lib/utils/character/buildPassiveSenseObj';
import capitalizeString from '@/lib/utils/capitalizeString';

import { skillListAbilities } from '@/lib/features/characters/charactersSlice';


export const ViewCharacterSheet = ({ character }) => {
    const dispatch = useAppDispatch();

    function getAbilityScoreModifierString(score: string, bonus = 0) {
        let modifier: any = determineAbilityScoreModifier(score, bonus);
        if (modifier > 0) {
            modifier = `+${modifier}`;
        }
        return `${modifier}`;
    }
    
    function handleAbilityScoreClick(data: any) {
        const modifier = determineAbilityScoreModifier(data[1]);
        const name = capitalizeString(data[0]);
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
        const name = capitalizeString(data[0]);
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
        return Object.entries(skillListAbilities).map((skill, i) => {
            const bonus = getSkillsBonus(skill[0], character);
            const skillRollNumber = determineAbilityScoreModifier(character.abilityScores[skill[1]], bonus);
            const skillRoll = getAbilityScoreModifierString(character.abilityScores[skill[1]], bonus);
            const name = skill[0];
            return (
                <div key={i}><div className="inline" onClick={() => handleSkillClick(name, skillRollNumber)}><SmallButton text={skillRoll}></SmallButton></div> <span className="pl-3">{capitalizeString(name)}</span></div>
            )
        })
    }

    const buildPassiveSenses = () => {
        const passiveSensesObj = buildPassiveSensesObj(character);

        return (
            <>
                <div><span className="font-bold inline-block min-w-6 text-right">{passiveSensesObj.Perception}</span> : Passive Perception</div>
                <div><span className="font-bold inline-block min-w-6 text-right">{passiveSensesObj.Investigation}</span> : Passive Investigation</div>
                <div><span className="font-bold inline-block min-w-6 text-right">{passiveSensesObj.Insight}</span> : Passive Insight</div>


            </>
        )
    }

    function showCondition(char) {
        return Object.entries(char.conditions).map((data: any, i: number) => {
            if (data[1] === false) {
                return '';
            }

            return (
                <div key={`${i}-general`}>{capitalizeString(data[0])}</div>
            )
        })
    }

    function showNotes(char) {
         return char.notes;
    }

    function buildLanguagesList(char) {
        return Object.entries(char.languages).map((data: any, i: number) => {
            if (data[1] === false) {
                return '';
            }
            return (
                <div key={`${i}-general`}>{capitalizeString(data[0])}</div>
            )
        });
    }

  return (
    <>
        <div className="flex flex-wrap gap-4 justify-center">
            <CharacterAttributeContainer title="General">
                {Object.entries(character.general).map((data: any, i: number) => {
                    return (
                    <div key={`${i}-general`}>{capitalizeString(data[0])}: <span className="font-bold">{capitalizeString(data[1])}</span></div>
                    )
                })}
                <Link className="font-bold block mt-2" href={`/character/edit/?id=${character.id}`}><Button text='Edit Character'></Button></Link>
            </CharacterAttributeContainer>
            <CharacterAttributeContainer title="Senses">
                {buildPassiveSenses()}
                {Object.entries(character.specialSenses).map((data: any, i: number) => {
                    if (data[1] <= 0) {
                        return '';
                    }
                    return (
                        <div key={`${i}-specialSenses`}><span className="font-bold inline-block min-w-6 text-right">{data[1]}</span> : <span>{capitalizeString(data[0])}</span></div>
                    )
                })}
            </CharacterAttributeContainer>
            <CharacterAttributeContainer title="Conditions">
                {showCondition(character)}
            </CharacterAttributeContainer>
            <CharacterAttributeContainer title="Languages">
                {buildLanguagesList(character)}
            </CharacterAttributeContainer>
            <CharacterAttributeContainer title="Notes">
                {showNotes(character)}
            </CharacterAttributeContainer>
        </div>
        <div className="flex flex-wrap gap-4 justify-center my-4">
            <div>
                <CharacterAttributeContainer title="Ability Scores">
                    {Object.entries(character.abilityScores).map((data: any, i: number) => {
                        return (
                            <div className="flex gap-2" key={`${i}-ability-score`}><div onClick={() => handleAbilityScoreClick(data)}><SmallButton text={getAbilityScoreModifierString(data[1])} /></div> <span className="font-bold min-w-6 text-right">{data[1]}</span><span className="px-2">{capitalizeString(data[0])}</span></div>
                        )
                    })}
                </CharacterAttributeContainer>
                <div className="mt-4">
                    <CharacterAttributeContainer title="Saving Throws">
                        {Object.entries(character.abilityScores).map((data: any, i: number) => {
                            let savingThrowBonus = getSavingThrowBonus(data[0]);
                            return (
                                <div className="flex" key={`${i}-saving-throw`}><div onClick={() => handleSavingThrowClick(data, savingThrowBonus)}><SmallButton text={getAbilityScoreModifierString(data[1], savingThrowBonus)} /></div> <span className="pl-3">{capitalizeString(data[0])}</span></div>
                            )
                        })}
                    </CharacterAttributeContainer>
                </div>
            </div>
            <CharacterAttributeContainer title="Skills">
                {buildSkillList()}
            </CharacterAttributeContainer>
            
        </div>
    
    </>
  );
};
