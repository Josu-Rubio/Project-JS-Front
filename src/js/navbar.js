import { replace } from './ui.js';
import renderHomeBeer from './beer.js';
import storage from './storage.js';

export const INPUT_STORAGE_ID = 'navbar-input';
export const STORAGE_TYPE = 'lStorage';

const { setItem, getItem } = storage(STORAGE_TYPE);

const navbar = document.querySelector('#navbar');
const searchButton = document.querySelector('#navbar-search');
const closeIcon = document.querySelector('#navbar-close');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#navbar .input.search');
const dateFrom = document.querySelector('#navbar #from');
const dateTo = document.querySelector('#navbar #to');


searchInput.value = getItem(INPUT_STORAGE_ID);

const handleNavbar = replace(navbar);

searchButton.addEventListener('click', evt => {
  handleNavbar('no-search', 'search');
});

closeIcon.addEventListener('click', () => {
  handleNavbar('search', 'no-search');
});

searchForm.addEventListener('submit', evt => {
  evt.preventDefault();
  if (searchInput.validity.valid ||
      dateFrom.validity.valid ||
    dateTo.validity.valid) {
    renderHomeBeer(searchInput.value, dateFrom.value, dateTo.value);
    setItem(INPUT_STORAGE_ID, searchInput.value, dateFrom.value, dateTo.value);
  }
});

const hideFilter = () => handleNavBar('search', 'no-search');
const showFilter = () => handleNavBar('no-search', 'search');

export { hideFilter, showFilter };











