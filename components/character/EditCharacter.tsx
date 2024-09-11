"use client";

import { useSearchParams } from 'next/navigation';

import { EditCharacterSheet } from "./EditCharacterSheet";

export const EditCharacter = () => {
  const searchParams = useSearchParams();
  const characterId = searchParams.get('id');

  if (!characterId) {
    return 'Invalid character ID';
  }

  return (
    <EditCharacterSheet characterId={characterId} />
  );
};
