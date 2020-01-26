import api from './api.js';
import { renderLoader } from './ui.js';
import { showFilter } from './navbar.js';

const { getBeers, getBeersData } = api();

const templateBeer = ({ beerId, name, image, price, brewersTips }) => {
    return `
    <a href="/detail/${beerId}">
      <div class="card ${beerId ? 'principal' : 'secondary close'}">
        <header class="card-header">
          <h2>${name}</h2>
        </header>
        <div class="card-content">
          <div class="card-content-image">
            <img src="${image}">
          </div>
            <div class="beer-content-text">
              <p> Price: ${price} €.</p>
              <p class="parrafo"> Tips for brewers: <br> ${brewersTips} </p>
            </div>
          </div>
        </div>
      </a>
    `
}

export const renderBeers = (element, items) => {
  const htmlBeer = items.slice(0, 10).map(function (beer, index) {
    if (index < 2) {
      return templateBeer({ ...beer, principal: true });
    }
    return templateBeer({ ...beer, principal: false})
    }).join('')
  element.innerHTML = ` 
    <div class="beer-section">
    ${htmlBeer}
    </div>
    `;
  ;
}

export const renderHomeBeer = async (text, dataFrom, dataTo) => {
  try {
    renderLoader('hide', 'show');
    let bringBeerResult;
    if (!dataFrom && !dataTo) {
      bringBeerResult = await getBeers(text);
    } else {
      bringBeerResult = await getBeersData(text, dataFrom, dataTo);
    }
    const showMain = document.querySelector('main');
    renderBeers(showMain, bringBeerResult);
  } catch (err) {
    console.error(err);
  } finally {
    renderLoader('show', 'hide');
  }
};
export default renderHomeBeer;