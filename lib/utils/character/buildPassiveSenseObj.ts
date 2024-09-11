import getSkillsBonus from './getSkillsBonus';
import determineAbilityScoreModifier from './determineAbilityScoreModifier';

// import type { Character } from ;


const buildPassiveSensesObj = ((char) => {
    console.log('char', char);
    const perceptionBonus = getSkillsBonus('Perception', char);
    const investigationBonus = getSkillsBonus('Investigation', char);
    const insightBonus = getSkillsBonus('Insight', char);

    const passiveSensesObj = {
        Perception: 10 + determineAbilityScoreModifier(char.abilityScores.wisdom, perceptionBonus),
        Investigation: 10 + determineAbilityScoreModifier(char.abilityScores.intelligence, investigationBonus),
        Insight: 10 + determineAbilityScoreModifier(char.abilityScores.wisdom, insightBonus)
    }

    return passiveSensesObj;
});

export default buildPassiveSensesObj;