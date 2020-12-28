import {findFirst} from '@revgaming/helpers'
import {config} from '@revgaming/config'
import Preference from '@revgaming/preference'

export const getTimeZones = () => require('./data/timezones.json')
export const getTimeZoneCountryCode = () => {
  const timeZone = getTimeZone()
  if (timeZone) return timeZone['c']
}
export const getTimeZone = tz =>
  findFirst(getTimeZones(), {t: tz ?? config('app.timezone')})
export const setTimeZone = (tz, isPreferred = true) => {
  const timeZone = getTimeZone(tz)
  if (timeZone) {
    config({'app.timezone': tz})
    if (isPreferred) Preference.set('timezone', tz)
    return true
  }
}

export const detectTimeZone = function () {
  const timezones = getTimeZones()

  const setTimezone = tz => {
    const t = tz ? findFirst(timezones, {t: tz}) : null
    if (t) {
      config({'app.timezone': tz})
      return true
    }
  }

  if (setTimezone(Preference.get('timezone'))) return true
  else if (setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone))
    return true
  else if (window['config'] && setTimezone(config('app.timezone'))) return true
  else if (setTimezone('UTC')) return true
  else throw 'timezone can not be detected'
}
