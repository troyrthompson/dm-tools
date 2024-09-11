"use client";

import { useState } from "react";

import { selectCharacters } from "@/lib/features/characters/charactersSlice";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { recordDiceRoll } from "@/lib/features/dice/diceSlice";
import { rollDice } from "@/lib/utils/diceUtils";
import { determineAbilityScoreModifier } from "@/lib/utils/characterUtils";
import { abilities } from "@/lib/data/characterData";

import type { Dice } from "@/lib/types/dice";

import { SmallButton } from "../elements/SmallButton";

import { Widget } from "../elements/Widget";
import { WidgetSelect } from "../elements/WidgetSelect";

import capitalizeString from "@/lib/utils/capitalizeString";
import getModifierString from "@/lib/utils/getModifierString";

import type { Ability } from "@/lib/types/character";

type AbilityOptons = Ability | '';

export const Abilities = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState(Array<{character: string, ability: number}>);
  const [ability, setAbility] = useState<AbilityOptons>('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const ability = e.target.value as Ability;
    setAbility(ability);
    determineApplicableCharacters(ability);
  };

  function determineApplicableCharacters(abilityName: Ability) {
    const characterList = characters.map((character) => {
        let abilityRoll = determineAbilityScoreModifier(character.abilityScores[abilityName as keyof Ability]);
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
