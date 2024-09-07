"use client";

import { useState } from "react";

import { selectRollers, addRollers, updateRoller, deleteRoller, getNextRollerId } from "@/lib/features/rollers/rollersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import type { Dice } from "@/lib/features/dice/diceSlice";

import type { Roller, RollerType } from "@/lib/features/rollers/rollersSlice";

import { InputRoller } from "../rollers/inputRoller";
import { ButtonRoller } from "../rollers/ButtonRoller";

import { RollList } from "../dice/RollList";

import { HeadingOne } from "../typography";
import Head from "next/head";

let rollerId = -1;

export const Rollers = () => {
    const defaultValues = {
        type: 'input',
        name: 'New Roller',
        buttonText: 'Add Roller',
        quantity: 1,
        sides: 20,
        modifier: 0,
    }
    const [editRoller, setEditRoller] = useState(false);
    const dispatch = useAppDispatch();
    const rollers = useAppSelector(selectRollers);
    const [formData, setFormData] = useState(defaultValues);
    const nextRollerId = useAppSelector(getNextRollerId);

    function handleSubmit() {
        const dice: Dice = {
            quantity: formData.quantity,
            sides: formData.sides,
            modifier: formData.modifier
        }

        const roller: Roller = {
            id: nextRollerId,
            name: formData.name,
            type: formData.type as RollerType,
            dice: dice
        }
        if (editRoller) {
            roller.id = rollerId;
            dispatch(updateRoller(roller));
        } else {
            dispatch(addRollers(roller));
        }
    }

    function deleteCurrentRoller() {
        const rollerToDelete = rollers.filter((roller) => {
            return roller.id === rollerId;
        });
        dispatch(deleteRoller(rollerToDelete[0]));
        stopEditing();
    }

    function stopEditing() {
        setEditRoller(false);
        setFormData(defaultValues);
    }

    function startEditing(index) {
        const roller = rollers[index];
        rollerId = roller.id;
        const updatedFormData = {
            type: roller.type,
            name: roller.name,
            buttonText: 'Edit Roller',
            quantity: roller.dice.quantity,
            sides: roller.dice.sides,
            modifier: roller.dice.modifier
        }
        setFormData(updatedFormData);
        setEditRoller(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            console.log(prevData);
            const newData = {
                ...prevData,
                [name]: value
            }
            return newData;
        });
    };

    return (
        <>
            <h1>Rollers</h1>
                <form onSubmit={e => { e.preventDefault(); handleSubmit()}}>
                    <div>
                        <label htmlFor="type">Type</label>
                        <select onChange={handleChange} name="type" id="rollerType" value={formData.type}>
                            <option value="input">Input</option>
                            <option value="button">Button</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} type="text" name="name" value={formData.name} />
                    </div>
                    <div>
                        <label htmlFor="quantity">Dice</label>
                        <input onChange={handleChange} type="number" name="quantity" value={formData.quantity} />
                    </div>
                    <div>
                        <label htmlFor="sides">Sides</label>
                        <input onChange={handleChange} type="number" name="sides" value={formData.sides} />
                    </div>
                    <div>
                        <label htmlFor="modifier">Modifier</label>
                        <input onChange={handleChange} type="number" name="modifier" value={formData.modifier} />
                    </div>
                    <div className="flex-2">
                        <button type="submit">{formData.buttonText}</button>
                    </div>
                </form>

            <hr/>
            {editRoller ? (
                <>
                    <button onClick={() => {deleteCurrentRoller()}}>Delete Roller</button>
                    <button onClick={() => {stopEditing()}}>Stop Editing Roller</button>
                </>
            ) : (
                <>
                <h1>Rollers</h1>
                {rollers.map((roller, index) => {
                    return (
                        <div key={index}>
                            {roller.type === 'button' ? (
                                <>
                                    <ButtonRoller roller={roller} index={index}/>
                                    <button onClick={() => {startEditing(index)}}>Edit Roller</button>
                                </>
                            ) : (
                                <InputRoller roller={roller} index={index}/>
                            )}
                        </div>
                    )
                    })
                }
                </>
            )}
            
        </>
    );
};
