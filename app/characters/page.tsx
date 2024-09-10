import { Characters } from "../components/characters/Characters";
import Link from "next/link";
import { Button } from "../components/elements/Button";

export default function CharactersPage() {
  return (
    <>
      <Characters />
      <div className="flex flex-wrap gap-2 justify-center mt-6 button">
          <Link href="/character/add">
              <Button text="Add Character" color="green" />
          </Link>
      </div>
    </>
  );
}
