import translations from "./translations";
import {timezones, timezone, getTimezoneCode, setTimezoneCode, detectTimeZone,} from "./timezone";
import {countries, country} from "./country";

export default function (opts) {
    detectTimeZone();
    if (window['mergeTranslations'])
        mergeTranslations('location', translations)

    return {
        getTimezone: getTimezoneCode,
        setTimezone: setTimezoneCode,
        timezone: timezone,
        timezones: timezones,
        country: country,
        countries: countries,
    }
}
