"use client";

import { useState } from "react";

import { selectCharacters } from "@/lib/features/characters/charactersSlice";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";
import determineAbilityScoreModifier from "@/lib/utils/character/determineAbilityScoreModifier";
import { abilities } from "@/lib/features/characters/charactersSlice";

import type { Dice } from "@/lib/features/dice/diceSlice";

import { SmallButton } from "../elements/SmallButton";

import { Widget } from "../elements/Widget";
import { WidgetSelect } from "../elements/WidgetSelect";

import capitalizeString from "@/lib/utils/capitalizeString";
import getModifierString from "@/lib/utils/getModifierString";

export const Abilities = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState(Array<{character: string, ability: number}>);
  const [ability, setAbility] = useState('');

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
        modifier: parseInt(abilityRollNumber),
        name: `${ability} Check`
    }
    dispatch(recordDiceRoll(rollDice(dice)));
}

  return (
    <Widget title="Abilities">
        <WidgetSelect onChangeHandler={handleSelectChange} value={ability}>
            <option hidden value="">Options</option>
            {abilities.map((abilityItem, i) => {
                return (
                    <option key={i} value={abilityItem}>
                      {capitalizeString(abilityItem)}
                    </option>
                );
            })}
        </WidgetSelect>

        <div>
        {applicableCharacters.map((character, index) => {
          return (
            <div key={index}>
              <div>
                <span onClick={(e) => {handleSkillClick(character.ability)}}>
                  <SmallButton text={getModifierString(character.ability)} />
                </span>
                {character.character}
              </div>
            </div>
          );
        })}
        </div>
    </Widget>
  );
};
