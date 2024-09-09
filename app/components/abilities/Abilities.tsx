"use client";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import type { Dice } from "@/lib/features/dice/diceSlice";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

import determineAbilityScoreModifier from "@/lib/utils/character/determineAbilityScoreModifier";

import { useState } from "react";

import { SmallButton } from "../elements/SmallButton";

import { abilities, classFeaturesList } from "@/lib/features/characters/charactersSlice";

export const Abilities = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState([]);
  const [ability, setAbility] = useState('strength');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAbility(e.target.value);
    determineApplicableCharacters(e.target.value);
  };

  function determineApplicableCharacters(abilityName: string) {
    const characterList = characters.map((character) => {
        let abilityRoll = determineAbilityScoreModifier(character.abilityScores[abilityName]);
        return {
            character: character.general.name,
            ability: abilityRoll
        }
    });

    characterList.sort((a, b) => b.ability - a.ability);

    setApplicableCharacters(characterList);
  }

  function handleSkillClick(abilityRollNumber) {
    const dice: Dice = {
        quantity: 1,
        sides: 20,
        modifier: abilityRollNumber,
        name: `${ability} Check`
    }
    dispatch(recordDiceRoll(rollDice(dice)));
}

  return (
    <div className="flex flex-wrap justify-center mt-6">
      <div className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline">
        <h2 className="block text-md font-bold mb-2">Abilities</h2>
        <select className="w-32 border border-gray-200" onChange={handleSelectChange} value={ability}>
            {abilities.map((abilityItem, i) => {
                return (
                    <option key={i} value={abilityItem}>
                    {abilityItem}
                    </option>
                );
            })}
        </select>

        <div>
        {applicableCharacters.map((character, index) => {
          return (
            <div key={index}>
              <div><span onClick={(e) => {handleSkillClick(character.ability)}}><SmallButton text={character.ability > 0 ? `+${character.ability}` : `${character.ability}`} /></span> {character.character}</div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
