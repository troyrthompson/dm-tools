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

import { Button } from '../elements/Button';

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
    const promptFeedback = prompt('Type "delete" to confirm.');

    if (promptFeedback === 'delete') {
      dispatch(deleteCharacter(currentCharacter));
      router.push('/characters');
    }
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
    router.push('/character?id=' + characterToUpdate.id);
  }

  return (
    <div>
        <form className="flex flex-col justify-center align-center" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>

          <EditCharacterSheet characterDataArr={characterDataArr} inputRefs={inputRefs} />
          <div className="flex justify-center mt-8">
            <Button text="Update Character"></Button>
          </div>
        </form>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center mt-12" onClick={() => { deleteThisCharacter(); }}><Button text="Delete Character"></Button></div>
        </div>
    </div>
  );
};
