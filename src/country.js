import Preference from "@revgaming/preference";
import {findFirst} from "@revgaming/helpers";
import {getTimezoneCountryCode} from "./timezone";


export const getCountryCode = () => Preference.get('country') ?? getTimezoneCountryCode()
export const setCountryCode = (code) => Preference.set('country', code);
export const country = (code) => findFirst(countries(), {code: code ?? getCountryCode()});
export const countries = () => require("./data/countries.json");


