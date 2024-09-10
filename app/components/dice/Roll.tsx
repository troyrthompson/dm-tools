"use client";

import { useAppSelector } from "@/lib/hooks";

import { selectRollers } from "@/lib/features/rollers/rollersSlice";
import { InputRoller } from "../rollers/InputRoller";
import { ButtonRoller } from "../rollers/ButtonRoller";

export const Roll = () => {
    const rollers = useAppSelector(selectRollers);
    return (
        <div className="flex flex-wrap justify-center content-center">
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
