let throwUndefined = () => {
    throw 'country code required'
}

const getDefault = () => {
    if (typeof throwUndefined !== 'function') throw 'callback is not a function'
    const country = throwUndefined()
    if (typeof country !== 'string') throw 'localized did nor return string'
    return country
}

const flagClasses = (opts) => {
    let country, squared

    if (typeof opts === 'object') {
        country = opts['country'] ?? getDefault()
        squared = opts['squared'] ?? false
    } else if (typeof opts === 'string') {
        country = opts
        squared = false
    } else if (typeof opts === 'boolean') {
        country = getDefault()
        squared = opts
    } else {
        country = getDefault()
        squared = false
    }

    return 'flag-icon flag-icon-'
        .concat(country.toLowerCase())
        .concat(squared ? ' flag-icon-squared' : '')
}

const setDefaultCountryCallback = (func) => {
    if (typeof func !== 'function') throw 'parameter must be function'
    throwUndefined = func
}

export { flagClasses, setDefaultCountryCallback }
