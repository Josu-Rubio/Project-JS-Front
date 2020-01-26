import renderHomeBeer from './beer.js';
import renderDetail, { removeForm } from './detail.js';
import storage from './storage.js';
import { INPUT_STORAGE_ID, STORAGE_TYPE } from './navbar.js';

const { getItem } = storage(STORAGE_TYPE);

page('/', () => {
    removeForm();
    renderHomeBeer(getItem(INPUT_STORAGE_ID));
});
page('/detail/:id', (ctx) => {
    const { params: { id } } = ctx;
    renderDetail(id);
});
page();
