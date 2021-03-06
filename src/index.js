import {mergeTranslations} from '@revgaming/languages'
import {
  getTimeZones,
  setTimeZone,
  detectTimeZone,
  getTimeZonesByCountry,
} from './timezone'
import {getCountries, getCountry, getCountryName, setCountry} from './country'
import translations from './translations'
import {config} from '@revgaming/config'

const timezone = () => config('app.timezone')

export const bootLocation = (opts = {}) => {
  const tz = opts.timezone

  if (tz) setTimeZone(tz, false)
  else detectTimeZone()

  mergeTranslations('location', translations)
  return {
    timezone: timezone,
    setTimeZone: setTimeZone,
    getTimeZones: getTimeZones,
    getTimeZonesByCountry: getTimeZonesByCountry,
    getCountry: getCountry,
    setCountry: setCountry,
    getCountries: getCountries,
    getCountryName: getCountryName,
  }
}

export {
  timezone,
  setTimeZone,
  getTimeZones,
  getCountry,
  getCountries,
  getCountryName,
  getTimeZonesByCountry,
}
