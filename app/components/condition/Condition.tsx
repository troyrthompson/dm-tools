"use client";

import {
  selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";

import { updateCharacter } from "@/lib/features/characters/charactersSlice";

import { SmallButton } from "../elements/SmallButton";

import { conditionsList } from "@/lib/features/characters/charactersSlice";

export const Condition = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  const updatedCharacter = JSON.parse(JSON.stringify(characters[0]));

  updatedCharacter.conditions.blinded = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    const char = characters.find((character) => character.id === parseInt(e.target.elements.characterId.value));
    const updatedCharacter = JSON.parse(JSON.stringify(char));
    updatedCharacter.conditions[e.target.elements.conditionName.value] = !updatedCharacter.conditions[e.target.elements.conditionName.value];
    dispatch(updateCharacter(updatedCharacter));
  };

  return (
    <div className="flex flex-wrap justify-center mt-6">
      <form className="flex flex-col gap-2 p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline" onSubmit={handleSubmit}>
        <label htmlFor="conditionName"><h2 className="block text-md font-bold mb-2">Conditions</h2></label>
        <select className="border border-gray-200" id="conditionName">
          {Object.keys(conditionsList).map((condition, i) => {
            return (
              <option key={i} value={condition}>
                {condition}
              </option>
            );
          })}
        </select>
        <select className="border border-gray-200" id="characterId">
          {characters.map((character, i) => {
            return (
              <option key={i} value={character.id}>
                {character.general.name}
              </option>
            );
          })}
        </select>
        <SmallButton text="Update Condition" />
      </form>
   </div>
  );
};
