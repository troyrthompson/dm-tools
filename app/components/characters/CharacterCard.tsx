"use client";

import Link from "next/link";
import { useState } from "react";

import { updateCharacter } from "@/lib/features/characters/charactersSlice";
import { useAppDispatch } from "@/lib/hooks";

import capitalizeString from "@/lib/utils/capitalizeString";

export const CharacterCard = ({character, index}) => {
  const dispatch = useAppDispatch();
  const [hitPoints, setHitPoints] = useState(character.general.hitPoints);

  function handleChange(e) {
    setHitPoints(e.target.value);
    const updatedCharacter = { ...character, general: { ...character.general, hitPoints: parseInt(e.target.value) }}
    dispatch(updateCharacter(updatedCharacter));
  }

  function handleNotesBlur(e) {
    const updatedCharacter = { ...character, notes: e.target.textContent }
    dispatch(updateCharacter(updatedCharacter));
  }
  return (
    <div key={character.id} className="min-w-1/12 min-w-36 block w-full-sm bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline">
        <div className="flex flex-col items-center pb-3 pt-3">
        <Link className="text-center block mb-2" href={`./character/?id=${character.id}`} key={character.id}><h5 className="text-xl leading-none font-medium text-gray-900 dark:text-white px-4">{character.general.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{capitalizeString(character.general.race)} {capitalizeString(character.general.class)}</span></Link> 
            <span className="text-md mb-1.5">HP <input className="w-12 pl-2 border border-gray-100" onChange={handleChange} type="number" value={hitPoints}></input></span>
            {Object.entries(character.conditions).map((data: any, i: number) => {
                if (data[1] === false) {
                    return '';
                }
                return (
                    <span className="text-xs text-gray-500" key={`${i}-general`}>{capitalizeString(data[0])}</span>
                )
            })}
            <span onBlur={handleNotesBlur} suppressContentEditableWarning="true" contentEditable className="text-xs align-item-end border border-gray-300 text-gray-500 w-28 resize-none mt-2">{character.notes}</span>
        </div>
    </div>    
  );
};
