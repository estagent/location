export const findAll = (objects, search) => {
    const results = [];
    for (let object of objects) {
        for (let key of Object.keys(search)) {
            if (object[key] === search[key]) {
                results.push(object)
            }
        }
    }
    return results;
}

export const findFirst = (objects, search) => {
    for (let object of objects) {
        for (let key of Object.keys(search)) {
            if (object[key] === search[key]) {
                return object;
            }
        }
    }
}


export const pluck = (objects, key) => {
    const results = [];
    for (let object of objects) {
        if (object[key]) results.push(object[key]);
    }
    return results;
}


export const pluckKeys = (objects, keys) => {
    const results = [];
    for (let object of objects) {
        const ob = {};
        for (let key of keys) {
            if (object[key])
                ob[key] = object[key]
        }
        if (Object.keys(ob).length)
            results.push(ob);
    }
    return results;
}
