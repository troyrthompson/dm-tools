'use client';

import Link from 'next/link';

import { characterClasseList } from '@/lib/data/characterData';

import { useSearchParams } from 'next/navigation';

import useSWR from 'swr';
 
const fetcher = (...args) => fetch(...args).then((res) => res.json());
 
export default function MonstersPage() {
    const searchParams = useSearchParams();
    const characterClass = searchParams.get('name');
    const { data, error } = useSWR(`https://www.dnd5eapi.co/api/classes/${characterClass}`, fetcher);
    let characterPosition = characterClasseList.indexOf(characterClass);

    if (characterClass === 'barbarian') {
        characterPosition = 9;
    }
 
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

  console.log(data);
 
  return (
    <>
    <Link href={`https://www.dndbeyond.com/classes/${characterClass}`}>{characterClass} Information</Link>
    <Link href={`https://www.dndbeyond.com/spells?filter-class=${characterPosition}`}>Spells</Link>
    
    <div className="flex gap-4">
        <div>
            {data.proficiencies.map((proficiency) => {
                return (
                    <div>{proficiency.name}</div>
                );
            })}
        </div>
        <div>
            {data.proficiency_choices.map((prof) => {
                return (
                    <>
                        <p>{prof.desc}</p>
                    </>
                );
            })}
        </div>
    </div>
    <div>
        <p>{data.spellcasting.spellcasting_ability.name}</p>
        {data.spellcasting.info.map((spellcast) => {
            return (
                <>
                    <h2 className="font-bold block">{spellcast.name}</h2>
                    <p>{spellcast.desc}</p>
                </>
            );
        })}
    </div>
    </>
  )
}
