"use client";

type CharacterSheetProps = {
    characterDataArr: any[];
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
};

export const EditCharacterSheet = ({ characterDataArr, inputRefs }: CharacterSheetProps) => {
    let superIndex = 0;
  return (
    <div className="flex flex-wrap gap-4 justify-center">
        {characterDataArr.map((character, index) => {
            return (
            <div className="p-8 rounded-xl shadow-lg" key={index}>
                <div className="flex flex-col">
                    <h2 className="text-2xl mb-2 mt-0">{character[0]}</h2>
                    {character[1].map((data: any, i: number) => {

                    return ( 
                        <input className="text-sm h-6 pl-1 py-1 border border-gray-300 mb-1" type={typeof data[1] === 'string' ? 'string' : 'number'} key={data[0]} id={data[0]} ref={el => inputRefs.current[superIndex++] = el} defaultValue={data[1]} />
                    )
                    })}
                </div>
            </div>
            );
        })}
    </div>
  );
};
