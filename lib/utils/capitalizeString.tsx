const capitalizeString = (str: string): string => {
    if (!str) {
        return '';
    }
    if (parseInt(str)) {
        return str;
    }
    return str[0].toUpperCase() + str.slice(1);
}

export default capitalizeString;