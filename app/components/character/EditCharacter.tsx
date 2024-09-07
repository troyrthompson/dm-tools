"use client";

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import { useRef } from "react";

import {
    selectCharacters,
    updateCharacter,
    deleteCharacter,
    parseCharacterProperties,
    defaultCharacter
} from "@/lib/features/characters/charactersSlice";

import { getInputValue } from '@/lib/helpers';

import { EditCharacterSheet } from './EditCharacterSheet';

import type { Character } from "@/lib/features/characters/charactersSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import styles from "./Counter.module.css";

export const EditCharacter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const characterId = searchParams.get('id');
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  const inputRefs = useRef([] as Array<HTMLInputElement | null>);
  
  function findCharacter(id: string | null): Character {
    const selectedCharacter = {...defaultCharacter};

    if (id === null) {
      return selectedCharacter;
    }
    let result = characters.find(character => character.id === parseInt(id));

    if (result === undefined) {
      return selectedCharacter;
    }

    return result;
  }

  const currentCharacter = findCharacter(characterId);

  const characterDataArr = parseCharacterProperties(currentCharacter);

  function deleteThisCharacter() {
    dispatch(deleteCharacter(currentCharacter));
    router.push('/characters');
  }

  function handleSubmit() {
    const characterToUpdate: Character = JSON.parse(JSON.stringify(defaultCharacter));

    let inputIndex = 0;

    characterToUpdate.id = currentCharacter.id;

    Object.keys(characterToUpdate).forEach((key) => {
      if (characterToUpdate[key] instanceof Object) {
        Object.keys(characterToUpdate[key]).forEach((k) => {
          characterToUpdate[key][k] = getInputValue(inputRefs.current[inputIndex]);
          inputIndex++;
        });
      }
    });
  
    dispatch(updateCharacter(characterToUpdate));
  }

  return (
    <div>
        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>

          <EditCharacterSheet characterDataArr={characterDataArr} inputRefs={inputRefs} />
          
          <button type="submit">Update Character</button>
        </form>
        <button type="button" onClick={() => { deleteThisCharacter(); }}>Delete Character</button>
    </div>
  );
};
