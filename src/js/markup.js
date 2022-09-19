export function markupCountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li class='country-list__item'>
      <img 
      class='country-list__img'
      src='${country.flags.svg}'
      alt='Flag of ${country.name.official}'
      width=20
      height=20
      />
      <span class='country-list__name'>
      ${country.name.official}</span>
      </li>`;
    })
    .join('');

  countryListEl.innerHTML = markup;
}

export function markupCountriesInfo(countries) {
  const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class='country-info__wrapper'>
            <img 
            class='country-info__img'
            src='${flags.svg}'
            alt='Flag of ${name.official}'
            width=20
            height=20
            />
            <h2 class='country-info__'>${name.official}</h2>
            </div>
        <ul class='country-info__'>
        <li class='country-info__'>
        <span class='country-info__'>Capital:</span><span class='country-info__'>${capital}</span>
        </li>
        <li>
        <span class='country-info__'>Population:</span><span class='country-info__'>${population}</span>
        </li>
        <li class='country-info__'>
        <span class='country-info__'>Languages:</span><span class='country-info__'>${Object.values(
          languages
        )}</span>
        </li>
        </ul>`;
    })
    .join('');

  countryInfoEl.innerHTML = markup;
}
