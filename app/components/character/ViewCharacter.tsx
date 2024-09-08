"use client";

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';

import {
    selectCharacterById,
    parseCharacterProperties,
} from "@/lib/features/characters/charactersSlice";

import { ViewCharacterSheet } from './ViewCharacterSheet';

import { useAppSelector } from "@/lib/hooks";


export const Char = () => {
  const searchParams = useSearchParams();
  const characterId = searchParams.get('id');

  const character = useAppSelector((state) => selectCharacterById(state, parseInt(characterId)));

  return (
    <>
        <ViewCharacterSheet character={character} />
    </>
  );
};
