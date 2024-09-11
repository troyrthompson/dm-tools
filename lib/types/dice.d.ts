export type Dice = {
    quantity: number;
    sides: number;
    modifier: number;
    name?: string;
};
  
export type DiceRoll = {
    quantity: number;
    sides: number;
    modifier: number;
    results: Array<number>;
    total: number;
    name?: string;
};