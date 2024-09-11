export const getSkillsBonus = ((skill: string, char) => {
    return (char.skillProficiencies.includes(skill) ? getProficiencyBonus(char.general.level) : 0);
});

export const getProficiencyBonus = ((level: number) => {
    return Math.ceil(level / 4) + 1;
});

export const determineAbilityScoreModifier = ((score: string, bonus = 0) => {
    return Math.floor((parseInt(score) - 10) / 2) + bonus;
});

export const buildPassiveSensesObj = ((char) => {
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