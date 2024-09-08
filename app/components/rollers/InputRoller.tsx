"use client";

import { recordDiceRoll, rollDice } from "@/lib/features/dice/diceSlice";

import { useAppDispatch } from "@/lib/hooks";

import { updateRoller } from "@/lib/features/rollers/rollersSlice";

import type { Roller } from "@/lib/features/rollers/rollersSlice";

import type { Dice } from "@/lib/features/dice/diceSlice";

import { SmallButton } from "../elements/SmallButton";

import './input-roller.css';

export const InputRoller = ({roller, index}) => {

    const dispatch = useAppDispatch();

    function handleChange(e) {
        const quantity = e.target.form.elements.quantity.valueAsNumber;
        const sides = e.target.form.elements.sides.valueAsNumber;
        const modifier = e.target.form.elements.modifier.valueAsNumber;
        const dice: Dice = {
            quantity: quantity,
            sides: sides,
            modifier: modifier
        }

        const roller: Roller = {
            id: parseInt(e.target.form.dataset.rollerId),
            name: e.target.form.dataset.rollerName,
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
    <form data-roller-id={roller.id} data-roller-name={roller.name} onChange={ e => {handleChange(e)}} className="input-roller-form flex flex-wrap content-center" key={index} onSubmit={e => { e.preventDefault(); handleSubmit(e)}}>
        <div className="input-roller-input-container">
            <input className="w-12 text-sm h-6 pl-1 py-1 border border-gray-300 mb-1 mx-5" type="number" name={'quantity'} defaultValue={roller.dice.quantity}/>
            <input className="w-12 text-sm h-6 pl-1 py-1 border border-gray-300 mb-1 mx-5" type="number" name={'sides'} defaultValue={roller.dice.sides}/>
            <input className="w-12 text-sm h-6 pl-1 py-1 border border-gray-300 mb-1 mx-5" type="number" name={'modifier'} defaultValue={roller.dice.modifier}/>
        </div>
        <SmallButton text={`${roller.dice.quantity}d${roller.dice.sides}+${roller.dice.modifier}`} />
    </form>
  );
};
