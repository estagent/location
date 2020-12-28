import {mergeTranslations} from "@revgaming/languages"
import {getTimeZones, getTimeZone, getTimeZoneCode, setTimeZoneCode, detectTimeZone} from "./timezone";
import {getCountries, getCountry} from "./country";
import translations from "./translations";

export const bootLocation = opts => {
    if (opts.hasOwnProperty("tz"))
        setTimeZoneCode(opts.tz, false)
    else
        detectTimeZone();
    mergeTranslations('location', translations)
}

export {
    getTimeZoneCode, setTimeZoneCode, getTimeZone, getTimeZones, getCountry, getCountries
}
