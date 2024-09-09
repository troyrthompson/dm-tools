"use client";

import { useRouter } from 'next/navigation'

import { useState } from 'react';

import {
    selectCharacters,
    updateCharacter,
    deleteCharacter,
    defaultCharacter,
    classFeaturesList,
    characterClasseList,
    getNextCharacterId,
    addCharacter
} from "@/lib/features/characters/charactersSlice";

import type { Character } from "@/lib/features/characters/charactersSlice";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { Button } from '../elements/Button';

export const EditCharacterSheet = ({characterId}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  
  function findCharacter(id: string | null): Character {
    const selectedCharacter = {...defaultCharacter};

    if (id === null) {
      return selectedCharacter;
    }
    let result = characters.find(character => character.id === parseInt(id));

    if (result === undefined) {
      return selectedCharacter;
    }

    return result;
  }

  const newCharacterId: number = useAppSelector(getNextCharacterId);

  const currentCharacter = findCharacter(characterId);

  const [formData, setFormData] = useState(currentCharacter);

  const skillList = classFeaturesList[formData.general.class].skillProficiencies;

  function deleteThisCharacter() {
    const promptFeedback = prompt('Type "delete" to confirm.');

    if (promptFeedback === 'delete') {
      dispatch(deleteCharacter(currentCharacter));
      router.push('/characters');
    }
  }

  function handleSubmit(e) {
    if (characterId === undefined) {
        const characterToUpdate: Character = formData;
        characterToUpdate.id = newCharacterId;
        dispatch(addCharacter(characterToUpdate));
        router.push('/characters');
    } else {
        const characterToUpdate: Character = formData;
        dispatch(updateCharacter(characterToUpdate));
        router.push('/character?id=' + characterToUpdate.id);
    }
  }

  function handleChange(e) {
    let { name, value } = e.target;
    let [parent, key] = name.split('.');

    if (e.target.type === 'number') {
      value = parseInt(value);
    } else if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    if (parent === 'skillProficiencies') {
      key = parseInt(key);
      const updatedSkills = formData.skillProficiencies.map((item, i) => {
        return i === key ? value : item
      });
      setFormData(prevState => ({
        ...prevState,
        [parent]: updatedSkills
      }));
    } else if (parent === 'notes') {
        setFormData(prevState => ({
            ...prevState,
            [parent]: value
        }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [key]: value
        }
      }));
    }
  }

  const outputGeneralInputs = (generalData: any) => {
      return Object.entries(generalData).map((data: any, i: number) => {
          let inputType = typeof data[1] === 'string' ? 'text' : 'number';
          if (data[0] === 'class') {
              return (
                  <div className="flex flex-col">
                      <label htmlFor={`general${data[0]}`}>{data[0]}</label>
                      <select onChange={handleChange} className="text-sm h-8 pl-1 py-1 border border-gray-300 mb-1" name={`general.${data[0]}`} key={`general${data[0]}`} id={`general${data[0]}`} value={data[1]}>
                          {characterClasseList.map((characterClass, index) => {
                              return (
                                  <option key={index} value={characterClass}>{characterClass}</option>
                              )
                          })}
                      </select>
                  </div>
              )
          } else {
              return (
                  <div className="flex flex-col">
                      <label htmlFor={`general${data[0]}`}>{data[0]}</label>
                      <input onChange={handleChange} className="text-sm h-6 pl-1 py-1 border border-gray-300 mb-1" type={inputType} name={`general.${data[0]}`} key={`general${data[0]}`} id={`general${data[0]}`} value={data[1]} />
                  </div>
              )   
          }          
      });
  }

  return (
    <div>
        <form className="flex flex-col justify-center align-center" onSubmit={e => { e.preventDefault(); handleSubmit(e); }}>

        <div className="flex flex-wrap gap-4 justify-center">
                <div className="p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl mb-2 mt-0">General</h2>
                    {outputGeneralInputs(formData.general)}
                </div>

                <div className="p-8 rounded-xl shadow-lg">
                    
                    <h2 className="text-2xl mb-2 mt-0">Ability Scores</h2>
                    {Object.entries(formData.abilityScores).map((data: any, i: number) => {
                        return (
                            <div className="flex flex-col">
                                <label htmlFor={`abilityScore${data[0]}`}>{data[0]}</label>
                                <input onChange={handleChange} className="text-sm h-6 pl-1 py-1 border border-gray-300 mb-1" name={`abilityScores.${data[0]}`} type="number" key={`abilityScore${data[0]}`} id={`abilityScore${data[0]}`} value={data[1]} />
                            </div>
                        )
                    })}
                </div>

                <div className="p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl mb-2 mt-0">Conditions</h2>
                    {Object.entries(formData.conditions).map((data: any, i: number) => {
                        return (
                            <div className="text-xs mb-1 flex align-center">
                                <input onChange={handleChange} className="text-sm border border-gray-300 mr-1" type="checkbox" name={`conditions.${data[0]}`} key={`conditions${data[0]}`} id={`conditions${data[0]}`} defaultChecked={formData.conditions[data[0]]} />
                                <label htmlFor={`conditions${data[0]}`}>{data[0]}</label>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <div className="p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl mb-2 mt-0">Skill Proficiencies</h2>
                    {formData.skillProficiencies.map((data: any, i: number) => {
                        return (
                            <div>
                                <select onChange={handleChange} className="text-sm h-8 pl-1 py-1 border border-gray-300 mb-1" name={`skillProficiencies.${i}`} key={`skillProficiencies${i}`} id={`skillProficienciesdata${i}`}  value={data}>
                                {skillList.map((skill, index) => {
                                    return (
                                        <option key={index} value={skill}>{skill}</option>
                                    )
                                })}
                                </select>
                            </div>
                        )
                    })}
                </div>

                <div className="p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl mb-2 mt-0">Notes</h2>
                    <textarea onChange={handleChange} name={`notes`} value={formData.notes}></textarea>
                </div>
                <div className="p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl mb-2 mt-0">Special Senses</h2>
                    {Object.entries(formData.specialSenses).map((data: any, i: number) => {
                        return (
                            <div className="flex flex-col">
                                <label htmlFor={`specialSenses${i}`}>{data[0]}</label>
                                <input onChange={handleChange} className="text-sm h-6 pl-1 py-1 border border-gray-300 mb-1" type="number" name={`specialSenses.${data[0]}`} key={`specialSenses.${data[0]}`} id={`specialSenses${i}`} value={data[1]} />
                            </div>
                        )
                    })}
                </div>

                <div className="p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl mb-2 mt-0">Languages</h2>
                    {Object.entries(formData.languages).map((data: any, i: number) => {
                        return (
                            <div className="text-xs mb-1 flex align-center">
                                <input onChange={handleChange} className="text-sm border border-gray-300 mr-1" type="checkbox" name={`languages.${data[0]}`} key={`languages${data[0]}`} id={`languages${data[0]}`} defaultChecked={formData.languages[data[0]]} />
                                <label htmlFor={`languages${data[0]}`}>{data[0]}</label>
                            </div>
                        )
                    })}
                </div>

            </div>
          <div className="flex justify-center mt-8">
            {(characterId === undefined) ? <Button text="Add Character"></Button> : <Button text="Update Character"></Button>}
          </div>
        </form>
        {(characterId === undefined) ? <div></div> : (
            <div className="flex flex-col justify-center">
                <div className="flex justify-center mt-12" onClick={() => { deleteThisCharacter(); }}><Button text="Delete Character"></Button></div>
             </div>
        )}

    </div>
  );
};
