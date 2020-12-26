import {findFirst} from "@revgaming/helpers";
import Preference from "@revgaming/preference";

let __timezone;

export const getTimezoneCode = () => __timezone.t;
export const getTimezoneCountryCode = () => __timezone.c;

export const timezone = (tz) => tz ? findFirst(timezones(), {tz: tz}) : __timezone;

export const timezones = () => require("./data/timezones.json");

export const setTimezoneCode = (tz, isPreferred = true) => {
    const t = timezone(tz);
    if (t) {
        __timezone = t;
        if (isPreferred)
            Preference.set('timezone', __timezone.t)
        return true;
    }
}

export const detectTimeZone = function () {

    const __timezones = timezones();

    const setTimezone = (tz) => {
        const t = tz ? findFirst(__timezones, {t: tz}) : null
        if (t) {
            __timezone = t;
            return __timezone;
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
