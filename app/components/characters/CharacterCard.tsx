"use client";

import Link from "next/link";

export const CharacterCard = ({linkUrl, key, name, race, characterClass}) => {

  return (
    <Link href={linkUrl} key={key} className="sm:w-1/12 w-full min-w-32 block w-full-sm bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 no-underline">
        <div className="flex flex-col items-center pb-3 pt-3">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{race} {characterClass}</span>
        </div>
    </Link>    
  );
};
