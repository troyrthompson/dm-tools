"use client";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { useAppSelector } from "@/lib/hooks";

import { useState } from "react";

export const Languages = () => {

  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState<Array<string>>([]);
  const [language, setLanguage] = useState('common');

  const characterLanguages = characters.map((character) => {
    return {
      name: character.general.name,
      languages: character.languages,
    };
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    determineApplicableCharacters(e.target.value);
  };

  function determineApplicableCharacters(language: string) {
    const applicableCharacters: Array<string> = [];
    characterLanguages.forEach((character) => {
      if (character.languages[language]) {
        applicableCharacters.push(character.name);
      }
    });
    setApplicableCharacters(applicableCharacters);
  }

  return (
    <div className="flex flex-wrap justify-center">
      <div className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline">
        <h2 className="block text-md font-bold mb-2">Language</h2>
        <select className="w-32 border border-gray-200" onChange={handleSelectChange} value={language}>
          <option value='common'>Common</option>
          <option value='commonSignLanguage'>Common Sign Language</option>
          <option value='draconic'>Draconic</option>
          <option value='dwarvish'>Dwarvish</option>
          <option value='elvish'>Elvish</option>
          <option value='giant'>Giant</option>
          <option value='gnomish'>Gnomish</option>
          <option value='goblin'>Goblin</option>
          <option value='halfling'>Halfling</option>
          <option value='orc'>Orc</option>
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
