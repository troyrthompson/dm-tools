"use client";

import { useAppSelector } from "@/lib/hooks";

import { selectRollHistory } from "@/lib/features/dice/diceSlice";

import getModifierString from "@/lib/utils/getModifierString";

export const RollList = () => {

    const rolls = useAppSelector(selectRollHistory).slice(-5);

    function outputModifier(modifier: number) {
        if (modifier === 0) {
            return "";
        }
        return (
            <span>{getModifierString(modifier)}</span>
        )
    }

    function outputEachDieResult(results) {
        if (results.length === 1) {
            return "";
        }
        
        return (
            <>
            <span>(</span>
                {results.map((result, i) => {
                    return (
                        <span className="font-italic" key={i}>{i > 0 && ", "}{result}</span>
                    )
                })}
            <span>)</span>
            </>
     )
    }

    function outputQuantity(quantity: number) {
        if (quantity === 1) {
            return "";
        } else {
            return quantity;
        }
    }

    const outputRoll = (rolls, roll, index) => {
        if (rolls.length - 1 === index) {
            return (
                <>
                    <div className="leading-none italic">{roll.name}</div>
                    <div className="leading-none text-3xl" key={index}><span className="font-bold">{roll.total}</span> : {outputQuantity(roll.quantity)}d{roll.sides} {outputModifier(roll.modifier)} {outputEachDieResult(roll.results)}</div>
                </>
            )
        }

        return (
            <>
                <div className="leading-none italic">{roll.name}</div>
                <div className="leading-none" key={index}><span className="font-bold">{roll.total}</span> : {outputQuantity(roll.quantity)}d{roll.sides} {outputModifier(roll.modifier)} {outputEachDieResult(roll.results)}</div>
            </>
        )
    };

  return (
    <>
        {rolls.map((roll, index) => {
            return outputRoll(rolls, roll, index);
        })}
    </>
  );
};
