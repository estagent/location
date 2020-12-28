import Preference from "@revgaming/preference";
import {findFirst} from "@revgaming/helpers";
import {getTimeZoneCountryCode} from "./timezone";
import {config} from "@revgaming/config";

export const getCountryCode = () => Preference.get('country') ?? getTimeZoneCountryCode()
export const setCountryCode = (code) => Preference.set('country', code);
export const getCountry = (code) => findFirst(getCountries(), {code: code ?? getCountryCode()});
export const getCountries = () => require("./data/countries.json");
export const getCountryName = () => {
    const country = getCountry()
    if (country) return country[config('app.locale')] ?? country['en']
}


