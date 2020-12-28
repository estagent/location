import Preference from "@revgaming/preference";
import {findFirst} from "@revgaming/helpers";
import {getTimeZoneCountryCode} from "./timezone";


export const getCountryCode = () => Preference.get('country') ?? getTimeZoneCountryCode()
export const setCountryCode = (code) => Preference.set('country', code);
export const getCountry = (code) => findFirst(getCountries(), {code: code ?? getCountryCode()});
export const getCountries = () => require("./data/countries.json");



