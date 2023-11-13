
const isStringsEqual = (s1: string, s2: string) => {
    return getBaseString(s1) === getBaseString(s2);
}

const getBaseString = (str: string) => {
    return str.toLowerCase().trim();
}

export default isStringsEqual;