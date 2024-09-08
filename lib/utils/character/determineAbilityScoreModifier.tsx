const determineAbilityScoreModifier = ((score: string, bonus = 0) => {
    return Math.floor((parseInt(score) - 10) / 2) + bonus;
});

export default determineAbilityScoreModifier;