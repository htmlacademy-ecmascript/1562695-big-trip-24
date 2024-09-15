import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeText} from '../utils/common.js';

function createFilterItemTemplate(filterItem, isChecked) {
  const {type, count} = filterItem;
  return `
  <div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${count===0? 'disabled': ''} ${isChecked? 'checked': ''}>
            <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeText(type)}</label>
          </div>
  `
}

function createFiltersListTemplate(filtersList) {
  return (`
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filtersList.map((filterItem, index)=>createFilterItemTemplate(filterItem, index === 0)).join('')}

          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>`);
}

export default class FilterView extends AbstractView {
  #filtersList = null;

  constructor({ filtersList }) {
    super();
    this.#filtersList = filtersList;
  }

  get template() {
    return createFiltersListTemplate(this.#filtersList);
  }
}
