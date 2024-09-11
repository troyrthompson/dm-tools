"use client";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { useState } from "react";

import { useAppSelector } from "@/lib/hooks";

import { Widget } from "../elements/Widget";
import { WidgetSelect } from "../elements/WidgetSelect";

import type { Language } from "@/lib/types/character";

type LanguageOptions = Language | 'Options';

export const Languages = () => {

  const characters = useAppSelector(selectCharacters);

  const [applicableCharacters, setApplicableCharacters] = useState<Array<string>>([]);
  const [language, setLanguage] = useState<LanguageOptions>('Options');

  const characterLanguages = characters.map((character) => {
    return {
      name: character.general.name,
      languages: character.languages,
    };
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value as Language;
    setLanguage(language);
    determineApplicableCharacters(language);
  };

  function determineApplicableCharacters(language: Language) {
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
