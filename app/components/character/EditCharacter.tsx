"use client";

import { useSearchParams } from 'next/navigation';

import { EditCharacterSheet } from "./EditCharacterSheet";

export const EditCharacter = () => {
  const searchParams = useSearchParams();
  const characterId = searchParams.get('id');

  return (
    <EditCharacterSheet characterId={characterId} />
  );
};
