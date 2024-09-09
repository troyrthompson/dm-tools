"use client";

import Link from "next/link";

import { updateCharacter } from "@/lib/features/characters/charactersSlice";

import { useState } from "react";

import { useAppDispatch } from "@/lib/hooks";

export const CharacterCard = ({character}) => {
  const dispatch = useAppDispatch();
  const [hitPoints, setHitPoints] = useState(character.general.hitPoints);

  function handleChange(e) {
    setHitPoints(e.target.value);
    const updatedCharacter = { ...character, general: { ...character.general, hitPoints: parseInt(e.target.value) }}
    dispatch(updateCharacter(updatedCharacter));
  }

  function handleNotesChange(e) {
    const updatedCharacter = { ...character, notes: e.target.textContent }
    dispatch(updateCharacter(updatedCharacter));
  }
  return (
    <div className="min-w-1/12 min-w-36 block w-full-sm bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline">
        <div className="flex flex-col items-center pb-3 pt-3">
        <Link className="text-center" href={`./character/?id=${character.id}`} key={character.id}><h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white px-4">{character.general.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{character.general.race} {character.general.class}</span></Link> 
            <span className="text-md text-gray-700 dark:text-gray-400">HP: <input className="w-12 border border-gray-200" onChange={handleChange} type="number" value={hitPoints}></input></span>
            {Object.entries(character.conditions).map((data: any, i: number) => {
                if (data[1] === false) {
                    return '';
                }
                return (
                    <div key={`${i}-general`}>{data[0]}</div>
                )
            })}
            <span onBlur={handleNotesChange} contentEditable className="text-xs border border-gray-300 text-gray-400 w-28 resize-none mt-2">{character.notes}</span>
        </div>
    </div>    
  );
};
