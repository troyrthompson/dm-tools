import { Dice } from "@/lib/types/dice";

export type RollerType = 'button' | 'input';

export type Roller = {
    id: number,
  name: string,
  type: RollerType,
  dice: Dice,
};