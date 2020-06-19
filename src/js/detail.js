import { renderLoader } from './ui.js';
import api from './api.js';

const detailTemplate = ({
  name,
  likes,
  image,
  description,
  firstBrewed,
  price,
  brewersTips,
  ingredients,
}) => `
    <div class="detail-section">

        <div class="beer-name">
            <h1>${name}</h1>
        </div>

        <div class="beer-content-left">
            <div class="beer-content-image">
                <img src="${image}" />
            </div>
        </div>

        <div class="likes">
        <h1>${likes} <img src="/Img/star.png" height="30px"  alt="Likes"/></h1>
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

        <div>
        Do you like this beer?
        </div>
        <form id="likes-form" class="likesForm" novalidate>
        <button type="submit" class="likesButton">LIKE!</button>
        </form>

    </div>
`;

const { getBeersDetail, addLike } = api();

export const removeForm = () => {
  const formSection = document.querySelector('#detailSection');
  formSection.innerHTML = '';
};

const addLikes = (id) => {
  document
    .querySelector('likesButton')
    .addEventListener('submit', async (evt) => {
      evt.preventDefault();
      addLike(sessionStorage.getItem('beerId'));
    });
};

const renderDetail = async (id) => {
  try {
    renderLoader('hide', 'show');
    const [detail] = await Promise.all([getBeersDetail(id), addLike(id)]); // , renderQuotes(id)
    const template = detailTemplate(detail);
    const mainSection = document.querySelector('main');
    mainSection.innerHTML = template;
  } catch (err) {
    console.error(err);
  } finally {
    renderLoader('show', 'hide');
  }
};

export default renderDetail;
