"use client";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import type { Dice } from "@/lib/features/dice/diceSlice";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

import determineAbilityScoreModifier from "@/lib/utils/character/determineAbilityScoreModifier";

import getProficiencyBonus from "@/lib/utils/character/getProficiencyBonus";

import { useState } from "react";

import { SmallButton } from "../elements/SmallButton";

import { abilities, classFeaturesList } from "@/lib/features/characters/charactersSlice";

export const SavingThrows = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState([]);
  const [savingThrows, setSavingThrows] = useState('strength');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSavingThrows(e.target.value);
    determineApplicableCharacters(e.target.value);
  };

  function determineApplicableCharacters(abilityName: string) {
    const characterList = characters.map((character) => {
        let abilityRoll = determineAbilityScoreModifier(character.abilityScores[abilityName]);
        let modifier;
        classFeaturesList[character.general.class].savingThrows.includes(abilityName) ? modifier = getProficiencyBonus(character.general.level) : modifier = 0;
        
        return {
            character: character.general.name,
            ability: abilityRoll + modifier
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
        name: `${savingThrows} Saving Throw`
    }
    dispatch(recordDiceRoll(rollDice(dice)));
}

  return (
    <div className="flex flex-wrap justify-center mt-6">
      <div className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline">
        <h2 className="block text-md font-bold mb-2">Saving Throws</h2>
        <select className="w-32 border border-gray-200" onChange={handleSelectChange} value={savingThrows}>
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
