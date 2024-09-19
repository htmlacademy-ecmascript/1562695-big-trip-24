import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeText} from '../utils/common.js';
import {SORT_TYPES} from '../const';

function createSortItemTemplate(type, checkedSortType){
  return `
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"  value="sort-${type}" ${type === checkedSortType ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${type}" >${capitalizeText(type)}</label>
      </div>
  `;
}

function createSortListTemplate(checkedSortType) {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SORT_TYPES).map((type, index)=>createSortItemTemplate(type, checkedSortType)).join('')}

    </form>`);
}
export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #checkedSortType = null;

  constructor({checkedSortType, onSortTypeChange}) {
    super();
    this.#checkedSortType = checkedSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortListTemplate(this.#checkedSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.matches('input[name="trip-sort"]')) {
      return;
    }
    console.log(evt.target.dataset.sortType)
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
