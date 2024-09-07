"use client";

import { useState } from "react";

import { selectRollers, addRollers, updateRoller, deleteRoller, getNextRollerId } from "@/lib/features/rollers/rollersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import type { Dice } from "@/lib/features/dice/diceSlice";

import type { Roller, RollerType } from "@/lib/features/rollers/rollersSlice";

import { InputRoller } from "../rollers/InputRoller";
import { ButtonRoller } from "../rollers/ButtonRoller";

import { Button } from "../elements/Button";

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
            modifier: formData.modifier,
            name: formData.name
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
            buttonText: 'Update Roller',
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
            const newData = {
                ...prevData,
                [name]: value
            }
            return newData;
        });
    };

    return (
        <>
                <form className="flex flex-wrap justify-center" onSubmit={e => { e.preventDefault(); handleSubmit()}}>
                    <div className="mx-2 mb-4">
                        <label htmlFor="type">Type</label>
                        <select className="mx-2 w-42 text-sm h-6 pl-1 border border-gray-300" onChange={handleChange} name="type" id="rollerType" value={formData.type}>
                            <option value="input">Input</option>
                            <option value="button">Button</option>
                        </select>
                    </div>
                    <div className="mx-2 mb-4">
                        <label htmlFor="name">Name</label>
                        <input className="mx-2 w-42 text-sm h-6 pl-1 py-1 border border-gray-300" onChange={handleChange} type="text" name="name" value={formData.name} />
                    </div>
                    <div className="mx-2 mb-4">
                        <label htmlFor="quantity">Dice</label>
                        <input className="mx-2 w-12 text-sm h-6 pl-1 py-1 border border-gray-300" onChange={handleChange} type="number" name="quantity" value={formData.quantity} />
                    </div>
                    <div className="mx-2 mb-4">
                        <label htmlFor="sides">Sides</label>
                        <input className="mx-2 w-12 text-sm h-6 pl-1 py-1 border border-gray-300" onChange={handleChange} type="number" name="sides" value={formData.sides} />
                    </div>
                    <div className="mx-2 mb-4">
                        <label htmlFor="modifier">Modifier</label>
                        <input className="mx-2 w-12 text-sm h-6 pl-1 py-1 border border-gray-300" onChange={handleChange} type="number" name="modifier" value={formData.modifier} />
                    </div>
                    <div className="mx-2 mb-4">
                        <Button text={formData.buttonText}></Button>
                    </div>
                </form>

            <hr/>
            {editRoller ? (
                <div class="flex flex-wrap justify-center mt-10">
                    <div onClick={() => {deleteCurrentRoller()}}><Button text="Delete Roller"></Button></div>
                    <div onClick={() => {stopEditing()}}><Button text="Stop Editing Roller"></Button></div>
                </div>
            ) : (
                <>
                <div className="flex flex-wrap justify-center mt-10">
                
                    {rollers.map((roller, index) => {
                        return (
                            <div key={index}>
                                {roller.type === 'button' ? (
                                    <>
                                        <ButtonRoller roller={roller} index={index}/>
                                        <button className="text-center w-full" onClick={() => {startEditing(index)}}>Edit</button>
                                    </>
                                ) : (
                                    <>
                                        <InputRoller roller={roller} index={index}/>
                                        <button className="text-center w-full" onClick={() => {startEditing(index)}}>Edit</button>
                                    </>
                                )}
                            </div>
                        )
                        })
                    }
                </div>
                </>
            )}
            
        </>
    );
};
