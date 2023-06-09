const convertMapToArray = map => {
    return Array.from(map, ([key, value]) => ({ [key]: value }));
}

export {
    convertMapToArray
}
