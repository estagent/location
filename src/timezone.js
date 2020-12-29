import {findFirst, findAll} from '@revgaming/helpers'
import {config} from '@revgaming/config'
import Preference from '@revgaming/preference'
import {getCountryCode} from '@/country'

export const getTimeZones = () => require('./data/timezones.json')
export const getCountryCodeByTimeZone = tz => {
  const timeZone = getTimeZone(tz ?? config('app.timezone'))
  if (timeZone) return timeZone['c']
}
export const getTimeZonesByCountry = countryCode => {
  // return pluck(findAll(getTimeZones(), {c: countryCode ?? config('app.timezone')}),'t')
  return findAll(getTimeZones(), {c: countryCode ?? getCountryCode()})
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
