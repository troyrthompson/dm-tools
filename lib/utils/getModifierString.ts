const getModifierString = (modifier: string | number): string => {
    if (typeof modifier === 'string') {
        modifier = parseInt(modifier);
    }

    if (modifier > 0) {
        modifier = `+${modifier}`;
    }

    return `${modifier}`;
};

export default getModifierString;