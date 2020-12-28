import {mergeTranslations} from '@revgaming/languages'
import {getTimeZones, setTimeZoneCode, detectTimeZone} from './timezone'
import {getCountries, getCountry, getCountryName} from './country'
import translations from './translations'
import {config} from '@revgaming/config'

const timezone = () => config('app.timezone')

export const bootLocation = opts => {
  if (opts.hasOwnProperty('tz')) setTimeZoneCode(opts.tz, false)
  else detectTimeZone()
  mergeTranslations('location', translations)
  return {
    timezone: timezone,
  }
}

export {
  timezone,
  setTimeZoneCode as setTimezone,
  getTimeZones as timezones,
  getCountry as country,
  getCountries as countries,
  getCountryName as country_name,
}
