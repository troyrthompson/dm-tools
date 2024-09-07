'use client';

import { recordDiceRoll, rollDice } from '@/lib/features/dice/diceSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import type { Dice } from '@/lib/features/dice/diceSlice';

export const ViewCharacterSheet = ({ character }) => {
    const dispatch = useAppDispatch();

    function determineAbilityScoreModifier(score: string) {
        return Math.floor((parseInt(score) - 10) / 2);
    }

    function getAbilityScoreModifierString(score: string) {
        let modifier: any = determineAbilityScoreModifier(score);
        if (modifier > 0) {
            modifier = `+${modifier}`;
        }
        return `${modifier}`;
    }
    
    function handleAbilityScoreClick(data: any) {
        const modifier = determineAbilityScoreModifier(data[1]);
        const dice: Dice = {
            quantity: 1,
            sides: 20,
            modifier:modifier
        }

        dispatch(recordDiceRoll(rollDice(dice)));
    }
  return (
    <>
        <div>
            <h1>General</h1>
            <ul>
            {Object.entries(character.general).map((data: any, i: number) => {
                return (
                <li key={`${i}-general`}>{data[0]}: {data[1]}</li>
                )
            })}
            </ul>
        </div>
        <div>
            <h1>Ability Scores</h1>
            <ul>
            {Object.entries(character.abilityScores).map((data: any, i: number) => {
                return (
                    <li key={`${i}-ability-score`}>{data[0]}: <button onClick={() => handleAbilityScoreClick(data)}>{data[1]}</button>: {getAbilityScoreModifierString(data[1])}</li>
                )
            })}
            </ul>
        </div>
    </>
  );
};
