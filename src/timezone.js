import {findFirst} from "@revgaming/helpers";
import {config} from "@revgaming/config";
import Preference from "@revgaming/preference";


export const getTimeZones = () => require("./data/timezones.json");
export const getTimeZoneCode = () => config('app.timezone')
export const getTimeZoneCountryCode = () => getTimeZone()['c'];
export const getTimeZone = (tz) => findFirst(getTimeZones(), {tz: tz ?? config('app.timezone')})
export const setTimeZoneCode = (tz, isPreferred = true) => {
    const t = getTimeZone(tz);
    if (t) {
        config({'app.timezone': tz})
        if (isPreferred)
            Preference.set('timezone', tz)
        return true;
    }
}

export const detectTimeZone = function () {

    const timezones = getTimeZones();

    const setTimezone = (tz) => {
        const t = tz ? findFirst(timezones, {t: tz}) : null
        if (t) {
            config({'app.timezone': tz})
            return true;
        }
    }

    if (setTimezone(Preference.get('timezone')))
        return true
    else if (setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone))
        return true;

    else if (window['config'] && setTimezone(config('app.timezone')))
        return true;
    else if (setTimezone("UTC"))
        return true;
    else
        throw "timezone can not be detected"
}
