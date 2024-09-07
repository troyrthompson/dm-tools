"use client";

import { selectRollHistory } from "@/lib/features/dice/diceSlice";

import { useAppSelector } from "@/lib/hooks";

export const RollList = () => {

    const rolls = useAppSelector(selectRollHistory).slice(-5);

    console.log(rolls);

    function outputModifier(modifier: number) {
        if (modifier === 0) {
            return "";
        }
        return modifier < 0 ? (
            <span>{modifier}</span>
        ) : (
            <span>+{modifier}</span>
        )
    }

    function outputEachDieResult(results) {
        if (results.length === 1) {
            return "";
        }
        
        return results.map((result, i) => {
            return (
                <span className="font-italic" key={i} className="die-result">{i > 0 && ", "}{result}</span>
            )
        })
    }

    function outputQuantity(quantity: number) {
        if (quantity === 1) {
            return "";
        } else {
            return quantity;
        }
    }

  return (
    <>
        {rolls.map((roll, index) => {
            return (
                <>
                    <div className="leading-none">{roll.name}</div>
                    <div className="leading-none" key={index}><span className="font-bold">{roll.total}</span> : {outputQuantity(roll.quantity)}d{roll.sides} {outputModifier(roll.modifier)} {outputEachDieResult(roll.results)}</div>
                </>
            )
        })}
    </>
  );
};
