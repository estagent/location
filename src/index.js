import translations from "./translations";
import {getTimeZones, getTimeZone, getTimeZoneCode, setTimeZoneCode, detectTimeZone} from "./timezone";
import {getCountries, getCountry} from "./country";

export default function (opts = {}) {

    if (opts.hasOwnProperty("tz"))
        setTimeZoneCode(opts.tz, false)
    else
        detectTimeZone();

    if (window['mergeTranslations'])
        mergeTranslations('location', translations)

    return {
        getTimezone: getTimeZoneCode,
        setTimezone: setTimeZoneCode,
        timezone: getTimeZone,
        timezones: getTimeZones,
        country: getCountry,
        countries: getCountries,
    }
}
