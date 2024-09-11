import { EditCharacter } from "@/components/character/EditCharacter";
import { Suspense } from 'react'

export default function CharacterPage() {
  return (
    <Suspense>
      <EditCharacter />
    </Suspense>
  );
}
