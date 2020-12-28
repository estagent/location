import {buildCountries, buildTimezones, writeJSON, writeJS, loadJSON} from "./builders";

writeJSON('src/data/countries.json', buildCountries());
writeJSON('src/data/timezones.json', buildTimezones());


// const countries = loadJSON('scripts/data/countries_currencies.json');
//
// const currencies = {};
//
// for (let country of countries) {
//     if (country.currencyCode)
//         currencies[country.countryCode] = country.currencyCode.toLowerCase();
// }
//
// writeJSON('scripts/data/currencies.json', currencies);
