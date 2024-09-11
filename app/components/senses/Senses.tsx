"use client";

import { useState } from "react";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { useAppSelector } from "@/lib/hooks";

import { buildPassiveSensesObj } from '@/lib/utils/characterUtils';

import { Widget } from "../elements/Widget";
import { WidgetSelect } from "../elements/WidgetSelect";

export const PassiveTracker = () => {
  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState<Array<string>>([]);
  const [sensesValue, setSensesValue] = useState(14);
  const [sense, setSense] = useState('Choose Sense');

  const characterPassives = characters.map((character) => {
    const passiveSensesObj = buildPassiveSensesObj(character);
    Object.entries(character.specialSenses).forEach((sense) => {
      passiveSensesObj[sense[0]] = sense[1];
    });
    return {
      name: character.general.name,
      passive: passiveSensesObj,
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSensesValue(parseInt(e.target.value));
    determineApplicableCharacters(sense, parseInt(e.target.value));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSense(e.target.value);
    determineApplicableCharacters(e.target.value, sensesValue);
  };

  function determineApplicableCharacters(sense: string, sensesValue: number) {
    const applicableCharacters: Array<string> = [];
    characterPassives.forEach((character) => {
      if (character.passive[sense] >= sensesValue) {
        applicableCharacters.push(character.name);
      }
    });
    setApplicableCharacters(applicableCharacters);
  }

  return (
    <Widget title="Senses">
        <div>
        <WidgetSelect onChangeHandler={handleSelectChange} value={sense}>
          <option hidden value=''>Options</option>
          <option value='Perception'>Perception</option>
          <option value='Investigation'>Investigation</option>
          <option value='Insight'>Insight</option>
          <option value='blindsight'>Blindsight</option>
          <option value='darkvision'>Darkvision</option>
          <option value='tremorsense'>Tremorsense</option>
          <option value='truesight'>Truesight</option>
        </WidgetSelect>
        <input className="w-14 bg-gray-50 border border-l-0 border-gray-300 text-gray-900 text-sm leading-normal rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" onChange={handleInputChange} value={sensesValue}/>
        </div>

        <div>
        {applicableCharacters.map((character, index) => {
          return (
            <div key={index}>
              {character}
            </div>
          );
        })}
        </div>
    </Widget>
  );
};
