import {mergeTranslations} from '@revgaming/languages'
import {getTimeZones, setTimeZone, detectTimeZone} from './timezone'
import {getCountries, getCountry, getCountryName} from './country'
import translations from './translations'
import {config} from '@revgaming/config'

const timezone = () => config('app.timezone')

export const bootLocation = opts => {
  if (opts.hasOwnProperty('tz')) setTimeZone(opts.tz, false)
  else detectTimeZone()
  mergeTranslations('location', translations)
  return {
    timezone: timezone,
  }
}

export {
  timezone,
  setTimeZone,
  getTimeZones,
  getCountry,
  getCountries,
  getCountryName,
}
