import getProficiencyBonus from './getProficiencyBonus';

const getSkillsBonus = ((skill: string, char) => {
    return (char.skillProficiencies.includes(skill) ? getProficiencyBonus(char.general.level) : 0);
});

export default getSkillsBonus;