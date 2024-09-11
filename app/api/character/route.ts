import { NextResponse } from "next/server";

import { defaultCharacter } from "@/lib/data/characterData";

export async function GET(request: Request) {
  return NextResponse.json({ defaultCharacter });
}