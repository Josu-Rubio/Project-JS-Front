import { renderLoader } from './ui.js';
import api from './api.js';

const detailTemplate = ({ name, image, description, firstBrewed, price, brewersTips, ingredients }) => `
    <div class="detail-section">

        <div class="beer-name">
            <h1>${name}</h1>
        </div>

        <div class="beer-content-left">
            <div class="beer-content-image">
                <img src="${image}" />
            </div>
        </div>

        <div class="beer-content-right">

            <p class="information"> <span>Description:</span> ${description} </p>
            <p class="information"> <span>Bewers tips:</span> ${brewersTips} </p>
            <p> <span>First brewed:</span> ${firstBrewed} </p><p> <span>Price:</span> ${price} €.</p>
            <p> <span>Ingredients:</span> </p>
            <ul>
                <li> <span>Malt:</span> </li>
                    <ul class="ingredients" id="malt">${ingredients.malt[0].name} (Among others)</ul>
                <li> <span>Hops:</span> </li>
                    <ul class="ingredients" id="malt">${ingredients.hops[0].name} (Among others)</ul>  
                <li> <span>Yeast:</span> </li>
                    <ul class="ingredients" id="yeast">${ingredients.yeast}</ul>
            </ul>
            

        </div>

    </div>
    `;

const quotesFormtemplate = `
  <div id="detail" class="detail-content"></div>
  <div class="quotes-list">
    <h2>Opinion of our Testers</h2>
    <div id="quoteList">
    </div>
  </div>
  <form id="quote-form" method="POST" class="quote-form" novalidate>
    <div class="quote-input">
      <label for="quote">Want to share yours?</label>
      <input required id="quote" placeholder="Your comment here..." class="input primary" type="text">
    </div>
    <button type="submit" class="button primary">Add comment</button>
  </form>
`;


const QUOTES_API = 'https://quotes-api-keepcoding.herokuapp.com/api/v1'

const { getBeersDetail } = api();
const { getQuotes, createQuote } = api(QUOTES_API);

const renderForm = id => {
    const formSection = document.querySelector('#detailSection');
    formSection.innerHTML = quotesFormtemplate;
    const quoteForm = document.getElementById('quote-form');
    const quoteList = document.querySelector('#quoteList');
    const quoteInput = document.getElementById('quote');
    quoteForm.addEventListener('submit', async evt => {
        evt.preventDefault();
        if (quoteInput.validity.valid) {
            await createQuote(id, quoteInput.value);
            quoteList.innerHTML += quoteTemplate({
                quote: quoteInput.value,
                date: new Date(),
            });
            quoteInput.value = '';
        }
    });
};

export const removeForm = () => {
    const formSection = document.querySelector('#detailSection');
    formSection.innerHTML = '';
};

const quoteTemplate = ({ quote, date }) => `
  <div class="list-item">
    <p>"${quote}"</p>
    <span>${date.toDateString()}</span>
  </div>
`;

const renderDetail = async id => {
    try {
        renderLoader('hide', 'show');
        const [detail, quotes] = await Promise.all([
            getBeersDetail(id),
            getQuotes(id),
        ]);
        const template = detailTemplate(detail);
        const mainSection = document.querySelector('main');
        renderForm(id);
        const quoteList = document.querySelector('#quoteList');
        quoteList.innerHTML = quotes.map(quoteTemplate).join('');
        mainSection.innerHTML = template;
    } catch (err) {
        console.error(err);
    } finally {
        renderLoader('show', 'hide');
    }
};

export default renderDetail;

    