"use client";

import { useState } from "react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import {
  skillList, 
  skillListAbilities
} from "@/lib/data/characterData";

import type { Skill, Character } from "@/lib/types/character";

import { 
  getProficiencyBonus,
  determineAbilityScoreModifier,
} from "@/lib/utils/characterUtils";

import type { Dice } from "@/lib/features/dice/diceSlice";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

import { SmallButton } from "../elements/SmallButton";

import { Widget } from "../elements/Widget";
import { WidgetSelect } from "../elements/WidgetSelect";

export const Skills = () => {

    const dispatch = useAppDispatch();

  const characters = useAppSelector(selectCharacters);
  const [applicableCharacters, setApplicableCharacters] = useState<Array<{character: string, skill: number}>>([]);
  const [skill, setSkill] = useState('Options');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSkill(e.target.value);
    determineApplicableCharacters(e.target.value as Skill);
  };

  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  function determineApplicableCharacters(skill: Skill) {
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

  function handleSkillClick(skillRollNumber: number) {
    const dice: Dice = {
        quantity: 1,
        sides: 20,
        modifier: skillRollNumber,
        name: `${skill} Check`
    }
    dispatch(recordDiceRoll(rollDice(dice)));
}

  return (
    <Widget title="Skills">
        <WidgetSelect onChangeHandler={handleSelectChange} value={skill}>
            <option hidden value="">Options</option>
            {skillList.map((skillItem, i) => {
                return (
                    <option key={i} value={skillItem}>
                    {skillItem}
                    </option>
                );
            })}
        </WidgetSelect>

        <div>
          {applicableCharacters.map((character, index) => {
            return (
              <div key={index}>
                <div><span onClick={(e) => {handleSkillClick(character.skill)}}><SmallButton text={character.skill > 0 ? `+${character.skill}` : `${character.skill}`} /></span> {character.character}</div>
              </div>
            );
          })}
        </div>
    </Widget>
  );
};
