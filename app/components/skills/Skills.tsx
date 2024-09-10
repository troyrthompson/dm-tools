"use client";

import { useState } from "react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import {
  selectCharacters,
  skillList, 
  skillListAbilities
} from "@/lib/features/characters/charactersSlice";

import type { Dice } from "@/lib/features/dice/diceSlice";

import getProficiencyBonus from "@/lib/utils/character/getProficiencyBonus";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

import determineAbilityScoreModifier from "@/lib/utils/character/determineAbilityScoreModifier";

import { SmallButton } from "../elements/SmallButton";

export const Skills = () => {

    const dispatch = useAppDispatch();

  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState([]);
  const [skill, setSkill] = useState('Arcana');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSkill(e.target.value);
    determineApplicableCharacters(e.target.value);
  };

  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  function determineApplicableCharacters(skill: string) {
    const camelizedSkill = camelize(skill);
    const characterList = characters.map((character) => {
        const ability = skillListAbilities[camelizedSkill];
        let skillRoll = determineAbilityScoreModifier(character.abilityScores[ability]);
        if (character.skillProficiencies.includes(skill)) {
            skillRoll += getProficiencyBonus(character.general.level);
        }
        return {
            character: character.general.name,
            skill: skillRoll
        }
    });

    characterList.sort((a, b) => b.skill - a.skill);

    setApplicableCharacters(characterList);
  }

  function handleSkillClick(skillRollNumber) {
    const dice: Dice = {
        quantity: 1,
        sides: 20,
        modifier: skillRollNumber,
        name: `${skill} Check`
    }
    dispatch(recordDiceRoll(rollDice(dice)));
}

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline">
        <h2 className="block text-md font-bold mb-2">Skills</h2>
        <select className="w-32 border border-gray-200" onChange={handleSelectChange} value={skill}>
            {skillList.map((skillItem, i) => {
                return (
                    <option key={i} value={skillItem}>
                    {skillItem}
                    </option>
                );
            })}
        </select>

        <div>
        {applicableCharacters.map((character, index) => {
          return (
            <div key={index}>
              <div><span onClick={(e) => {handleSkillClick(character.skill)}}><SmallButton text={character.skill > 0 ? `+${character.skill}` : `${character.skill}`} /></span> {character.character}</div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
