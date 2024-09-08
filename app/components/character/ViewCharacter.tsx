"use client";

import { useSearchParams } from 'next/navigation';
import { selectCharacterById } from "@/lib/features/characters/charactersSlice";
import { ViewCharacterSheet } from './ViewCharacterSheet';
import { useAppSelector } from "@/lib/hooks";

export const Char = () => {
  const searchParams = useSearchParams();
  const characterId = searchParams.get('id');

  if (!characterId) {
    return <div>Invalid ID</div>;
  }

  const character = useAppSelector((state) => selectCharacterById(state, parseInt(characterId)));

  if (!character) {
    return <div>No Character Found</div>;
  }

  return (
    <>
        <ViewCharacterSheet character={character} />
    </>
  );
};
