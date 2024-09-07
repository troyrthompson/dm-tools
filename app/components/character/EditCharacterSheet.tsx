"use client";

type CharacterSheetProps = {
    characterDataArr: any[];
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
};

export const EditCharacterSheet = ({ characterDataArr, inputRefs }: CharacterSheetProps) => {
    let superIndex = 0;
  return (
    <>
        {characterDataArr.map((character, index) => {
            return (
            <div key={index}>
                <h2>{character[0]}</h2>
                {character[1].map((data: any, i: number) => {

                return ( 
                    <input type={typeof data[1] === 'string' ? 'string' : 'number'} key={data[0]} id={data[0]} ref={el => inputRefs.current[superIndex++] = el} defaultValue={data[1]} />
                )
                })}
            </div>
            );
        })}
    </>
  );
};
