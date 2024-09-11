const getProficiencyBonus = ((level: number) => {
    return Math.ceil(level / 4) + 1;
});

export default getProficiencyBonus;
