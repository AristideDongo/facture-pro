import countries from "i18n-iso-countries";

import('i18n-iso-countries/langs/fr.json').then((locale) => {
  countries.registerLocale(locale);
});

export const countryNames = Object.values(countries.getNames("fr")) as string[];
