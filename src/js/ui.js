export const replace = (elemento) => (removeClass, addClass) => {
  elemento.classList.remove(removeClass);
  elemento.classList.add(addClass);
};

const loader = document.querySelector('#loader');

export const renderLoader = replace(loader);
