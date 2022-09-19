export function markupCountriesList(countries, countryListEl) {
  const markup = countries
    .map(country => {
      return `<li class='country-list__item'>
      <img 
      class='country-list__img'
      src='${country.flags.svg}'
      alt='Flag of ${country.name.official}'
      />
      <span class='country-list__name'>
      ${country.name.official}</span>
      </li>`;
    })
    .join('');

  countryListEl.innerHTML = markup;
}
