"use client";

import { useAppSelector } from "@/lib/hooks";

import { selectRollers } from "@/lib/features/rollers/rollersSlice";

import { InputRoller } from "../rollers/inputRoller";

import { ButtonRoller } from "../rollers/ButtonRoller";

import { RollList } from "../dice/RollList";

export const Roll = () => {
    const rollers = useAppSelector(selectRollers);
    return (
        <div>
            {rollers.map((roller, i) => {
                return roller.type === 'input' ? (
                    <InputRoller roller={roller} index={i}/>
                ) : (
                    <ButtonRoller roller={roller} index={i}/>
                );
            })}
        </div>
    );
};
