import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { markupCountriesInfo } from './js/markup';
import { markupCountriesList } from './js/markup';
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