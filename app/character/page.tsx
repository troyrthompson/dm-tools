import { ViewCharacter } from "../components/character/ViewCharacter";
import { Suspense } from 'react';

export default function CharacterPage() {
  return (
    <Suspense>
      <ViewCharacter />
    </Suspense>
  );
}
