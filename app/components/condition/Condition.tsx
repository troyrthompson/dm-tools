"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { selectCharacters, updateCharacter,conditionsList } from "@/lib/features/characters/charactersSlice";

import { SmallButton } from "../elements/SmallButton";

import capitalizeString from "@/lib/utils/capitalizeString";

import { Widget } from "../elements/Widget";

export const Condition = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentCharacter = characters.find((character) => character.id === parseInt(e.target.elements.characterId.value));
    if (!currentCharacter) {
      return;
    }
    const updatedCharacter = JSON.parse(JSON.stringify(currentCharacter));
    updatedCharacter.conditions[e.target.elements.conditionName.value] = !updatedCharacter.conditions[e.target.elements.conditionName.value];
    dispatch(updateCharacter(updatedCharacter));
  };

  return (
    <Widget title="Conditions">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="conditionName">
          {Object.keys(conditionsList).map((condition, i) => {
            return (
              <option key={i} value={condition}>
                {capitalizeString(condition)}
              </option>
            );
          })}
        </select>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="characterId">
          {characters.map((character, i) => {
            return (
              <option key={i} value={character.id}>
                {character.general.name}
              </option>
            );
          })}
        </select>
        <div className="mt-2">
          <SmallButton text="Update" />
        </div>
      </form>
    </Widget>
  );
};
