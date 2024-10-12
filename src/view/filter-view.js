import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeText} from '../utils/common.js';

function createFilterItemTemplate(filterItem, currentFilterType) {
  const {type, count} = filterItem;
  return `
  <div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${count === 0 ? 'disabled' : ''} ${type === currentFilterType ? 'checked' : ''}>
            <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeText(type)}</label>
          </div>
  `;
}

function createFiltersListTemplate(filters, currentFilter) {
  return (`
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">
          ${filters.map((filterItem)=>createFilterItemTemplate(filterItem, currentFilter)).join('')}

          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>`);
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersListTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
