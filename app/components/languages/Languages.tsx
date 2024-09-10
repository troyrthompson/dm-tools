"use client";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { useState } from "react";

import { useAppSelector } from "@/lib/hooks";

import { Widget } from "../elements/Widget";
import { WidgetSelect } from "../elements/WidgetSelect";

export const Languages = () => {

  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState<Array<string>>([]);
  const [language, setLanguage] = useState('Options');

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
    <Widget title="Languages">
        <WidgetSelect onChangeHandler={handleSelectChange} value={language}>
          <option hidden value="">Options</option>
          <option value="common">Common</option>
          <option value="commonSignLanguage">Common Sign Language</option>
          <option value="draconic">Draconic</option>
          <option value="dwarvish">Dwarvish</option>
          <option value="elvish">Elvish</option>
          <option value="giant">Giant</option>
          <option value="gnomish">Gnomish</option>
          <option value="goblin">Goblin</option>
          <option value="halfling">Halfling</option>
          <option value="orc">Orc</option>
        </WidgetSelect>

        <div>
        {applicableCharacters.map((character, index) => {
          return (
            <div key={index}>
              <div>{character}</div>
            </div>
          );
        })}
        </div>
    </Widget>
  );
};
