export function getPlayerCountry(playerId, countries) {
  return countries.find(
    (country) => !country.isAi && country.owner?.id === playerId
  );
}
export function getCountryByName(countryName, countries) {
  return countries.find(
    (country) => !country.isAi && country.name === countryName
  );
}
