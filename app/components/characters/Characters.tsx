"use client";

import Link from "next/link";

import {
    selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { CharacterCard } from "./CharacterCard";

import { Button } from "../elements/Button";

import { useAppSelector } from "@/lib/hooks";

export const Characters = () => {
  const characters = useAppSelector(selectCharacters);

  return (
    <>
        <div className="flex flex-wrap gap-2 justify-center">
            {characters.map((character) => {
                return (
                    <CharacterCard linkUrl={`./character/?id=${character.id}`} key={character.id} name={character.general.name} race={character.general.race} characterClass={character.general.class} />
                )
            })}
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-6 button">
            <Link href="/character/add">
                <Button text="Add Character" />
            </Link>
        </div>
    </>
  );
};
