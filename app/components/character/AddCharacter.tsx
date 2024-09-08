"use client";

import { useRouter } from 'next/navigation'
import { useRef } from "react";

import {
    addCharacter,
    getNextCharacterId,
    defaultCharacter,
    parseCharacterProperties
} from "@/lib/features/characters/charactersSlice";

import { getInputValue } from '@/lib/helpers';

import type { Character } from "@/lib/features/characters/charactersSlice";

import { EditCharacterSheet } from "./EditCharacterSheet";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "../elements/Button";

export const AddCharacter = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const newCharacterData: Character = JSON.parse(JSON.stringify(defaultCharacter));
  const formattedCharacterData = parseCharacterProperties(newCharacterData);
  const newCharacterId: number = useAppSelector(getNextCharacterId);

  const inputRefs = useRef([] as Array<HTMLInputElement | null>);

  function handleSubmit() {
    const characterToUpdate: Character = JSON.parse(JSON.stringify(defaultCharacter));

    let inputIndex = 0;

    characterToUpdate.id = newCharacterId;

    Object.keys(characterToUpdate).forEach((key) => {
      if (characterToUpdate[key] instanceof Object) {
        Object.keys(characterToUpdate[key]).forEach((k) => {
          characterToUpdate[key][k] = getInputValue(inputRefs.current[inputIndex]);
          inputIndex++;
        });
      }
    });
    
    dispatch(addCharacter(characterToUpdate));
    router.push('/characters');
  }

  return (
    <div>
        <form className="flex flex-col justify-center align-center" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>

          <EditCharacterSheet characterDataArr={formattedCharacterData} inputRefs={inputRefs} />
          <div className="flex justify-center mt-8">
            <Button text="Add Character"></Button>
          </div>
        </form>
    </div>
  );
};
