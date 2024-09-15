import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeText} from '../utils/common.js';
import {SORT_TYPES} from '../const';

function createSortItemTemplate(type, isChecked){
  return `
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isChecked? 'checked': ''}>
        <label class="trip-sort__btn" for="sort-${type}">${capitalizeText(type)}</label>
      </div>

  `
}

function createSortListTemplate() {
  return (`
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_TYPES.map((type, index)=>createSortItemTemplate(type, index===0)).join('')}

    </form>`);
}
export default class SortView extends AbstractView {
  get template() {
    return createSortListTemplate();
  }
}
