import countries from "i18n-iso-countries";
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'))

export const countryNames = Object.values(countries.getNames("fr")) as string[];