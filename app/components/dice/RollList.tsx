"use client";

import { useAppSelector } from "@/lib/hooks";

import { selectRollHistory } from "@/lib/features/dice/diceSlice";

import getModifierString from "@/lib/utils/getModifierString";

import capitalizeString from "@/lib/utils/capitalizeString";

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
                    <div className="leading-none italic pt-2">{capitalizeString(roll.name)}</div>
                    <div className="leading-none text-3xl" key={index}><span className="font-bold">{roll.total}</span> : {outputQuantity(roll.quantity)}d{roll.sides} {outputModifier(roll.modifier)} {outputEachDieResult(roll.results)}</div>
                </>
            )
        }

        return (
            <>
                <div className="leading-none italic">{capitalizeString(roll.name)}</div>
                <div className="leading-none" key={index}><span className="font-bold">{roll.total}</span> : {outputQuantity(roll.quantity)}d{roll.sides} {outputModifier(roll.modifier)} {outputEachDieResult(roll.results)}</div>
            </>
        )
    };

  return (
    <>
        {rolls.length === 0 ? (
            ''
        ) : (
            <div className="text-center min-w-24 min-h-12 sm:text-left p-3 bg-white rounded-xl shadow-lg mb-4">
                {rolls.map((roll, index) => {
                    return outputRoll(rolls, roll, index);
                })}
            </div>
        )}
    </>
  );
};
