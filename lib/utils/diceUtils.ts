import { Dice, DiceRoll } from '@/lib/types/dice';

export function rollDice(dice: Dice): DiceRoll { 
    let total = 0;
    const resultsArray = [] as Array<number>;
    for (let i = 0; i < dice.quantity; i++) {
      let result = Math.floor(Math.random() * dice.sides) + 1;
      resultsArray.push(result);
      total += result;
    }
  
    const diceRoll: DiceRoll = {
      quantity: dice.quantity,
      sides: dice.sides,
      modifier: dice.modifier,
      results: resultsArray,
      total: total + dice.modifier,
      name: dice.name,
    }
  
    return diceRoll;
}