"use client";

type CharacterSheetProps = {
    characterDataArr: any[];
    inputRefs: React.MutableRefObject<(HTMLInputElement | HTMLSelectElement | null)[]>;
};

import { skillList } from "@/lib/features/characters/charactersSlice";
import { characterClasseList } from "@/lib/features/characters/charactersSlice";

export const EditCharacterSheet = ({ characterDataArr, inputRefs }: CharacterSheetProps) => {
    let superIndex = 0;

    const createInput = (type: string, data: string | number, i: number) => {
        let inputType = typeof data[1] === 'string' ? 'text' : 'number';

        if (type === 'skillProficiencies') {
            return (
                <select className="text-sm h-8 pl-1 py-1 border border-gray-300 mb-1" key={data[0]} id={data[0]} ref={el => inputRefs.current[superIndex++] = el} defaultValue={data[1]}>
                    {skillList.map((skill, index) => {
                        return (
                            <option key={index} value={skill}>{skill}</option>
                        )
                    })}
                </select>
            )
        } else if (type === 'conditions') {
            return (
                <>
                <label htmlFor={data[0]}>{data[0]}</label>
                <input className="text-sm h-6 pl-1 py-1 border border-gray-300 mb-1" type="checkbox" key={data[1]} id={data[1]} ref={el => inputRefs.current[superIndex++] = el} defaultChecked={data[1]} />
                </>
            )
        } else if (type === 'general' && data[0] === 'class') {
            return (
                <>
                <label htmlFor={data[0]}>{data[0]}</label>
                <select className="text-sm h-8 pl-1 py-1 border border-gray-300 mb-1" key={data[0]} id={data[0]} ref={el => inputRefs.current[superIndex++] = el} defaultValue={data[1]}>
                    {characterClasseList.map((characterClass, index) => {
                        return (
                            <option key={index} value={characterClass}>{characterClass}</option>
                        )
                    })}
                </select>
                </>
            )
        } else {
            return (
                <>
                <label htmlFor={data[0]}>{data[0]}</label>
                <input className="text-sm h-6 pl-1 py-1 border border-gray-300 mb-1" type={inputType} key={data[0]} id={data[0]} ref={el => inputRefs.current[superIndex++] = el} defaultValue={data[1]} />
                </>
            )
        }
    }

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {characterDataArr.map((character, index) => {
                return (
                <div className="p-8 rounded-xl shadow-lg" key={index}>
                    <div className="flex flex-col">
                        <h2 className="text-2xl mb-2 mt-0">{character[0]}</h2>
                        {character[1].map((data: any, i: number) => {
                            return ( 
                                createInput(character[0], data, i)
                            )
                        })}
                    </div>
                </div>
                );
            })}
        </div>
    );
};
