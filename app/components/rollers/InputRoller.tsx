"use client";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

import { useAppDispatch } from "@/lib/hooks";

import { updateRoller } from "@/lib/features/rollers/rollersSlice";

import type { Roller } from "@/lib/features/rollers/rollersSlice";

import type { Dice } from "@/lib/features/dice/diceSlice";

export const InputRoller = ({roller, index}) => {

    const dispatch = useAppDispatch();

    function handleChange(e) {
        const quantity = e.target.parentElement.elements.quantity.valueAsNumber;
        const sides = e.target.parentElement.elements.sides.valueAsNumber;
        const modifier = e.target.parentElement.elements.modifier.valueAsNumber;
        const dice: Dice = {
            quantity: quantity,
            sides: sides,
            modifier: modifier
        }

        const roller: Roller = {
            id: parseInt(e.target.parentElement.dataset.rollerId),
            name: e.target.parentElement.dataset.rollerName,
            type: 'input',
            dice: dice
        }
        dispatch(updateRoller(roller));
    }

    function handleSubmit(e) {
        const quantity = e.target.elements.quantity.valueAsNumber;
        const sides = e.target.elements.sides.valueAsNumber;
        const modifier = e.target.elements.modifier.valueAsNumber;

        const dice: Dice = {
            quantity: quantity,
            sides: sides,
            modifier:modifier
        }

        dispatch(recordDiceRoll(rollDice(dice)));
    }

  return (
    <form data-roller-id={roller.id} data-roller-name={roller.name} onChange={ e => {handleChange(e)}} className="roller-input-container" key={index} onSubmit={e => { e.preventDefault(); handleSubmit(e)}}>
        <input type="number" name={'quantity'} defaultValue={roller.dice.quantity}/>
        <input type="number" name={'sides'} defaultValue={roller.dice.sides}/>
        <input type="number" name={'modifier'} defaultValue={roller.dice.modifier}/>
        <button type="submit">{`${roller.dice.quantity}d${roller.dice.sides}+${roller.dice.modifier}`}</button>
    </form>
  );
};
