import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {EMPTY_LIST_TEXT, SORT_TYPES} from '../const.js';
import RoutePointPresenter from './route-point-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortByPrice, sortByTime, sortByDay} from '../utils/sorting.js';
import { render } from '../framework/render.js';

export default class RoutePointListPresenter {
  #routePointsListContainer = null;
  #routePointsModel = null;
  #sorting = null;

  #routePointsList = [];
  #sourcedRoutePoints = [];

  #routePointsPresenters = new Map();
  #routePointListComponent = new RoutePointListView();
  //#sorting = new SortView();
  #emptyList = new EmptyListView(EMPTY_LIST_TEXT.EVERYTHING);
  #defaultSortType = SORT_TYPES.DAY;

  constructor({ routePointsListContainer, routePointsModel }) {
    this.#routePointsListContainer = routePointsListContainer;
    this.#routePointsModel = routePointsModel;
  }

  init() {
    this.#routePointsList = [...this.#routePointsModel.routePoints].sort(sortByDay);
    this.#renderMainComponent();
  }

  #renderRoutePoint(routePoint){
    const routePointPresenter = new RoutePointPresenter({
      routePointListComponent : this.#routePointListComponent.element,
      routePointsModel : this.#routePointsModel,
      onRoutePointChange: this.#handleRoutePointChange,
      onModeChange: this.#handleModeChange,
    });
    routePointPresenter.init(routePoint);
    this.#routePointsPresenters.set(routePoint.id, routePointPresenter);
  }

  #renderListEmpty(){
    render(this.#emptyList, this.#routePointsListContainer);
  }

  #renderSorting(){
    this.#sorting = new SortView({
      checkedSortType: this.#defaultSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sorting, this.#routePointsListContainer);
  }

  #renderRoutePointsList(){
    render(this.#routePointListComponent, this.#routePointsListContainer);
    for (let i = 0; i < this.#routePointsList.length; i++) {
      this.#renderRoutePoint(this.#routePointsList[i]);
    }
  }

  #renderMainComponent(){
    if (this.#routePointsList.length === 0){
      this.#renderListEmpty();
      return;
    }
    this.#renderSorting();
    this.#renderRoutePointsList();
  }

  #clearRoutePointsList(){
    this.#routePointsPresenters.forEach((presenter) => presenter.destroy());
    this.#routePointsPresenters.clear();
  }

  #handleRoutePointChange = (updatedRoutePoint) => {
    this.#routePointsList = updateItem(this.#routePointsList, updatedRoutePoint);
    this.#routePointsPresenters.get(updatedRoutePoint.id).init(updatedRoutePoint);
  };

  #handleModeChange = () => {
    this.#routePointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortRoutePoints(sortType) {
    switch (sortType) {
      case SORT_TYPES.TIME:
        this.#routePointsList.sort(sortByTime);
        break;
      case SORT_TYPES.PRICE:
        this.#routePointsList.sort(sortByPrice);
        break;
      default:
        this.#routePointsList = this.#routePointsList.sort(sortByDay);
    }
  }

  #handleSortTypeChange = (checkedSortType) => {
    if (this.#defaultSortType === checkedSortType) {
      return;
    }
    this.#defaultSortType = checkedSortType;
    this.#sortRoutePoints(checkedSortType);
    this.#clearRoutePointsList();
    this.#renderRoutePointsList();
  };
}
