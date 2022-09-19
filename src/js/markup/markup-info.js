export function markupCountriesInfo(countries, countryInfoEl) {
  const markup = countries
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class='country-info__wrapper'>
            <img 
            class='country-info__img'
            src='${flags.svg}'
            alt='Flag of ${name.official}'
            />
            <h2 class='country-info__'>${name.official}</h2>
            </div>
        <ul class='country-info__list'>
        <li class='country-info__item'>
        <span class='country-info__item-name'>Capital:</span><span class='country-info__item-value'>${capital}</span>
        </li>
        <li class='country-info__item'>
        <span class='country-info__item-name'>Population:</span><span class='country-info__item-value'>${population}</span>
        </li>
        <li class='country-info__item country-info__languages'>
        <span class='country-info__item-name'>Languages:</span><span class='country-info__item-value'>${Object.values(
          languages
        ).join(', ')}</span>
        </li>
        </ul>`;
    })
    .join('');

  countryInfoEl.innerHTML = markup;
}
