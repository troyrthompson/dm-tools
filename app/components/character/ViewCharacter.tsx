"use client";

import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import { useRef } from "react";
import { useSelector } from "react-redux";

import {
    selectCharacterById,
    updateCharacter,
    deleteCharacter,
    parseCharacterProperties,
    defaultCharacter
} from "@/lib/features/characters/charactersSlice";

import { getInputValue } from '@/lib/helpers';

import { ViewCharacterSheet } from './ViewCharacterSheet';
import { Roll } from '../dice/Roll';

import type { Character } from "@/lib/features/characters/charactersSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from 'next/link';
// import styles from "./Counter.module.css";

export const Char = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const characterId = searchParams.get('id');

  const character = useAppSelector((state) => selectCharacterById(state, parseInt(characterId)));
  const characterDataArr = parseCharacterProperties(character);



  return (
    <>
        <ViewCharacterSheet character={character} />
    </>
  );
};
