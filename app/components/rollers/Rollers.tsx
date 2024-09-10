"use client";

import { useState } from "react";

import { selectRollers, addRollers, updateRoller, deleteRoller, getNextRollerId, moveRoller } from "@/lib/features/rollers/rollersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import type { Dice } from "@/lib/features/dice/diceSlice";

import type { Roller, RollerType } from "@/lib/features/rollers/rollersSlice";

import { InputRoller } from "../rollers/InputRoller";
import { ButtonRoller } from "../rollers/ButtonRoller";

import { Button } from "../elements/Button";
import { SmallButton } from "../elements/SmallButton";

import './edit-rollers.css';

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

    const shiftRollerFront = (index) => {
        if (index === 0) {
            return;
        }
        dispatch(moveRoller({fromIndex: index, toIndex: index - 1}));
    };

    const shiftRollerBack = (index) => {
        if (index === rollers.length - 1) {
            return;
        }
        dispatch(moveRoller({fromIndex: index, toIndex: index + 1}));
    };

    return (
        <>
            <div className="flex flex-wrap justify-center">
                <form className="flex flex-col flex-wrap justify-center" onSubmit={e => { e.preventDefault(); handleSubmit()}}>
                    <div className="mb-1">
                        <label className="block text-md font-semibold mb-2" htmlFor="name">Name</label>
                        <input className="w-52 appearance-none block bg-white text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleChange} type="text" name="name" value={formData.name} />
                    </div>
                    <div className="flex mb-1">
                        <div className="mr-4">
                        <label className="block text-md font-semibold mb-2" htmlFor="type">Type</label>
                        <select className="w-24 block bg-white text-gray-700 border border-gray-200 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleChange} name="type" id="rollerType" value={formData.type}>
                            <option value="input">Input</option>
                            <option value="button">Button</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-md font-semibold mb-2" htmlFor="quantity">Dice</label>
                        <input className="w-24 appearance-none block bg-white text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleChange} type="number" name="quantity" value={formData.quantity} />
                        </div>
                    </div>

                    <div className="flex mb-1">
                        <div className="mr-4">
                            <label className="block text-md font-semibold mb-2" htmlFor="sides">Sides</label>
                            <input className="w-24 appearance-none block bg-white text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleChange} type="number" name="sides" value={formData.sides} />
                        </div>
                        <div className="mb-1">
                            <label className="block text-md font-semibold mb-2" htmlFor="modifier">Modifier</label>
                            <input className="w-24 appearance-none block bg-white text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleChange} type="number" name="modifier" value={formData.modifier} />
                        </div>
                    </div>
                    <div className="flex justify-center mb-1">
                        <Button text={formData.buttonText} color="green"></Button>
                    </div>
                </form>
            </div>

            {editRoller ? (
                <div className="flex flex-wrap justify-center mt-10">
                    <div onClick={() => {deleteCurrentRoller()}}><Button text="Delete Roller" color="red"></Button></div>
                    <div onClick={() => {stopEditing()}}><Button text="Stop Editing Roller" color="purple"></Button></div>
                </div>
            ) : (
                <>
                <div className="flex flex-wrap justify-center mt-10">
                
                    {rollers.map((roller, index) => {
                        return (
                            <div className="relative roller-edit-container" key={index}>
                                {roller.type === 'button' ? (
                                    <>
                                        <ButtonRoller roller={roller} index={index}/>
                                    </>
                                ) : (
                                    <>
                                        <InputRoller roller={roller} index={index}/>
                                    </>
                                )}
                                <div className="flex fixed roller-edit-buttons-container">
                                    <div className="text-center w-full" onClick={() => {shiftRollerFront(index)}}><SmallButton text="<" color="purple" /></div>
                                    <div className="text-center w-full" onClick={() => {startEditing(index)}}><SmallButton text="Edit" color="purple" /></div>
                                    <div className="text-center w-full" onClick={() => {shiftRollerBack(index)}}><SmallButton text=">" color="purple" /></div>
                                </div>
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
