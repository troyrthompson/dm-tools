"use client";

import { useState } from "react";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { useAppSelector } from "@/lib/hooks";

import buildPassiveSensesObj from '@/lib/utils/character/buildPassiveSenseObj';

export const PassiveTracker = () => {
  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState<Array<string>>([]);
  const [sensesValue, setSensesValue] = useState(14);
  const [sense, setSense] = useState('Perception');

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
    <div className="flex flex-wrap justify-center">
      <div className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline">
        <h2 className="block text-md font-bold mb-2">Senses</h2>
        <input className="w-32 border border-gray-200 pl-2" type="number" onChange={handleInputChange} value={sensesValue}/>
        <select className="w-32 border border-gray-200" onChange={handleSelectChange} value={sense}>
          <option value='Perception'>Perception</option>
          <option value='Investigation'>Investigation</option>
          <option value='Insight'>Insight</option>
          <option value='blindsight'>Blindsight</option>
          <option value='darkvision'>Darkvision</option>
          <option value='tremorsense'>Tremorsense</option>
          <option value='truesight'>Truesight</option>
        </select>

        <div>
        {applicableCharacters.map((character, index) => {
          return (
            <div key={index}>
              <div>{character}</div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
