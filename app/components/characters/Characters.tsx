"use client";

import {
    selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { CharacterCard } from "./CharacterCard";
import { useAppSelector } from "@/lib/hooks";

export const Characters = () => {
  const characters = useAppSelector(selectCharacters);
  return (
    <div className="flex flex-wrap gap-2 justify-center">
        {characters.map((character) => {
            return (
                <CharacterCard character={character} />
            )
        })}
    </div>
  );
};
