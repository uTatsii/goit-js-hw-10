import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

var debounce = require('lodash.debounce');

const input = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  let countryName = e.target.value.trim();

  fetchCountries(countryName)
    .then(countries => renderCountries(countries))
    .catch(error => {
      console.log(error);
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountries(countries) {
  try {
    if (countries.length > 10) {
      return Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (countries.length > 1 && countries.length <= 10) {
      return markupCountriesList(countries);
    } else {
      markupCountriesInfo(countries);
    }
  } catch (error) {
    Notify.failure(
      'There is a failure while rendering an element! Check the console log for additional info.'
    );
    console.log(error);
  }
}

function markupCountriesList(countries) {
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

function markupCountriesInfo(countries) {
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
