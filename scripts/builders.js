import fs from "fs";
import config from "./config";
import {pluck} from "./Object";

const loadJSON = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const getCountries = () => loadJSON(config.countries);
const getFilteredCodes = () => ['remove', 'disabled'].includes(config.filterMode) ? loadJSON(config.filtered) : undefined;
const getLocales = () => loadJSON(config.locales)
const isRemoved = (code, codes) => codes && codes.length && codes.includes(code) && config.filterMode === "remove";
const isDisabled = (code, codes) => codes && codes.length && codes.includes(code) && config.filterMode === "disabled";
const basename = (file) => file.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');

const defaultTimezones = () => loadJSON(config.defaults);

const buildCountries = function () {

    const data = [];

    const countries = getCountries();
    const codes = getFilteredCodes();

    const locales = getLocales();
    const langs = Object.keys(locales);

    for (let code of Object.keys(countries)) {

        if (isRemoved(code, codes))
            continue;

        let name = countries[code];

        if (name.indexOf(',') > -1)
            name = name.split(',')[0];

        const country = {
            code: code.toUpperCase(),
            en: name
        }

        if (isDisabled(code, codes)) {
            country['disabled'] = true;
        } else {

            for (const lang of langs) {
                const translation = locales[lang][code];
                if (translation) {
                    country[lang.toLowerCase()] = translation;
                }
            }
        }
        data.push(country);
    }

    return data;
}


const buildTimezones = function () {

    const csv = fs.readFileSync(config.zoneFile, 'utf8')
    let lines = csv.split('\n')

    const codes = getFilteredCodes();

    let timezones = [];
    for (let line of lines) {

        if (!line)
            continue;

        if (line.indexOf('#') > -1)
            continue;

        let [code, coordinates, TZ, comment] = line.split("\t")

        if (!code || !TZ) {
            console.warn(`unparsed line #${line}#`);
            continue;
        }

        if (isRemoved(code, codes))
            continue;

        const timezone = {
            t: TZ,
            c: code.toUpperCase(),
            z: comment,
        };

        timezones.push(timezone)

    }

    const tzList = pluck(timezones, 't');

    const defaults = defaultTimezones();

    for (let timezone of Object.keys(defaults)) {
        if (!tzList.includes(timezone)) timezones.push({
            t: timezone,
            c: defaults[timezone]
        })
    }

    return timezones;
}
const writeJS = (file, obj) => {
    fs.writeFileSync(file, `export default ${JSON.stringify(obj)}`);
    console.log(`[created] ${file}`)
}

const writeJSON = (file, obj, tabs = null) => {
    fs.writeFileSync(file, JSON.stringify(obj), null, tabs);
    console.log(`[created] ${file}`)
}


export {
    buildCountries, buildTimezones,
    writeJS, writeJSON
}

