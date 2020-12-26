import {buildCountries, buildTimezones, writeJSON, writeJS} from "./builders";

writeJSON('src/data/countries.json', buildCountries());
writeJSON('src/data/timezones.json', buildTimezones());


