// country.helpers.ts
import Country, { CountryAttributes } from "./country.models";

export const findCountryByIso = async (
  iso2: string,
  iso3: string
): Promise<CountryAttributes | null> => {
  return await Country.findOne({
    where: { iso2, iso3 },
  });
};
