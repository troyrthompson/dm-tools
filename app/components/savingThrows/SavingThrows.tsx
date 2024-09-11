"use client";

import { useState } from "react";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import {
  abilities, 
  classFeaturesList,
} from "@/lib/data/characterData";

import {
  determineAbilityScoreModifier,
  getProficiencyBonus,
} from "@/lib/utils/characterUtils";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { recordDiceRoll } from "@/lib/features/dice/diceSlice";
import { rollDice } from "@/lib/utils/diceUtils";
import type { Dice } from "@/lib/types/dice";

import capitalizeString from "@/lib/utils/capitalizeString";

import { SmallButton } from "../elements/SmallButton";

import { Widget } from "../elements/Widget";
import { WidgetSelect } from "../elements/WidgetSelect";

export const SavingThrows = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState(Array<{character: string, ability: number}>);
  const [savingThrows, setSavingThrows] = useState('Options');

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
    <Widget title="Saving Throws">
        <WidgetSelect onChangeHandler={handleSelectChange} value={savingThrows}>
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
                <div><span onClick={(e) => {handleSkillClick(character.ability)}}><SmallButton text={character.ability > 0 ? `+${character.ability}` : `${character.ability}`} /></span> {character.character}</div>
              </div>
            );
          })}
        </div>
    </Widget>
  );
};
