"use client";

import Link from "next/link";

import {
    selectCharacters,
} from "@/lib/features/characters/charactersSlice";

import { useAppSelector } from "@/lib/hooks";
// import styles from "./Counter.module.css";

export const Characters = () => {
  const characters = useAppSelector(selectCharacters);

  return (
    <div>
        <ul>
            {characters.map((character) => {
                return (
                    <Link
                        href={`./character/?id=${character.id}`}
                        key={character.id}
                    >
                        <li>{character.general.name}, {character.general.race}, {character.general.class}</li>
                    </Link>
                )
            })}
        </ul>
        <Link href="/character/add">
            <button>Add Character</button>
        </Link>
    </div>
  );
};
