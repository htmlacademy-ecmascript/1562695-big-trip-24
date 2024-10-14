import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import RoutePointPresenter from './route-point-presenter.js';
import NewRoutePointPresenter from './new-route-point-presenter.js';

import {sortByPrice, sortByTime, sortByDay} from '../utils/sorting.js';
import { render, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';

export default class RoutePointListPresenter {
  #routePointsListContainer = null;
  #routePointsModel = null;
  #sorting = null;
  #filterModel = null;
  #emptyList = null;
  #newRoutePointPresenter = null;

  #routePointsPresenters = new Map();
  #routePointListComponent = new RoutePointListView();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({ routePointsListContainer, routePointsModel, filterModel, onNewRoutePointDestroy }) {
    this.#routePointsListContainer = routePointsListContainer;
    this.#routePointsModel = routePointsModel;
    this.#filterModel = filterModel;

    this.#newRoutePointPresenter = new NewRoutePointPresenter({
      routePointListComponent: this.#routePointListComponent.element,
      routePointsModel: this.#routePointsModel,
      onRoutePointChange: this.#handleViewAction,
      onDestroy: onNewRoutePointDestroy
    });

    this.#routePointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get routePoints() {
    this.#filterType = this.#filterModel.filter;
    const routePoints = this.#routePointsModel.routePoints;
    const filteredPoint = filter[this.#filterType](routePoints);
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoint.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoint.sort(sortByPrice);
    }
    return filteredPoint.sort(sortByDay);
  }

  init() {
    this.#renderMainComponent();
  }

  createPoint() {
    if (this.#emptyList) {
      remove(this.#emptyList);
    }

    this.#currentSortType = SortType.DAY;
    this.#filterType = FilterType.EVERYTHING;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newRoutePointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#routePointsModel.updateRoutePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#routePointsModel.addRoutePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#routePointsModel.deleteRoutePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#routePointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPage();
        this.#renderMainComponent();
        break;
      case UpdateType.MAJOR:
        this.#clearPage({resetSortType: true});
        this.#renderMainComponent();
        break;
    }
  };

  #clearPage({resetSortType = false} = {}) {
    this.#newRoutePointPresenter.destroy();
    this.#routePointsPresenters.forEach((presenter) => presenter.destroy());
    this.#routePointsPresenters.clear();
    remove(this.#sorting);
    if (this.#emptyList) {
      remove(this.#emptyList);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderRoutePoint(routePoint){
    const routePointPresenter = new RoutePointPresenter({
      routePointListComponent : this.#routePointListComponent.element,
      routePointsModel : this.#routePointsModel,
      onRoutePointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    routePointPresenter.init(routePoint);
    this.#routePointsPresenters.set(routePoint.id, routePointPresenter);
  }

  #renderListEmpty(){
    this.#emptyList = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#emptyList, this.#routePointsListContainer);
  }

  #renderSorting(){
    this.#sorting = new SortView({
      checkedSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sorting, this.#routePointsListContainer);
  }

  #renderRoutePointsList(){
    render(this.#routePointListComponent, this.#routePointsListContainer);
    this.routePoints.forEach((point) => this.#renderRoutePoint(point));
  }

  #renderMainComponent(){
    if (this.routePoints.length === 0){
      this.#renderListEmpty();
      return;
    }
    this.#renderSorting();
    this.#renderRoutePointsList();
  }


  #handleModeChange = () => {
    this.#newRoutePointPresenter.destroy();
    this.#routePointsPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPage();
    this.#renderMainComponent();
  };
}
