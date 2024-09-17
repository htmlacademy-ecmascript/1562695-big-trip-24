import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import PointEditFormView from '../view/point-edit-form-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {EMPTY_LIST_TEXT} from '../const.js';

import { render, replace } from '../framework/render.js';

export default class RoutePointListPresenter {

  #boardContainer = null;
  #routePointsModel = null;

  #routePointListComponent = new RoutePointListView();
  #sorting = new SortView();
  #emptyList = new EmptyListView(EMPTY_LIST_TEXT.EVERYTHING);

  #boardRoutePoints = [];


  constructor({ boardContainer, routePointsModel }) {
    this.#boardContainer = boardContainer;
    this.#routePointsModel = routePointsModel;
  }

  init() {
    this.#boardRoutePoints = [...this.#routePointsModel.routePoints];
    this.#renderMainComponent();
  }

  #renderRoutePoint(routePoint) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToRoutePoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const showEditorPoint = () => {
      replaceRoutePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const hideEditorPoint = () => {
      replaceFormToRoutePoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const routePointComponent = new RoutePointView({
      routePoint,
      offers: [...this.#routePointsModel.getOffersById(routePoint.type, routePoint.offers)],
      destination: this.#routePointsModel.getDestinationsById(routePoint.destination),
      onEditClick: () => showEditorPoint()
    });

    const editRoutePointComponent = new PointEditFormView({
      routePoint,
      destinationRoutePoint: this.#routePointsModel.getDestinationsById(this.#boardRoutePoints[0].destination),
      allOffers: this.#routePointsModel.getOffersByType(this.#boardRoutePoints[0].type),
      allDestinations: this.#routePointsModel.destinations,
      onFormSubmit: () => hideEditorPoint(),
      onEditRollUp: () => hideEditorPoint(),
    });

    function replaceRoutePointToForm() {
      replace(editRoutePointComponent, routePointComponent);
    }

    function replaceFormToRoutePoint() {
      replace(routePointComponent, editRoutePointComponent);
    }

    render(routePointComponent, this.#routePointListComponent.element);
  }

  #renderMainComponent(){
    if (this.#boardRoutePoints.length === 0){
      render(this.#emptyList, this.#boardContainer);
      return;
    }
    render(this.#sorting, this.#boardContainer);
    render(this.#routePointListComponent, this.#boardContainer);
    // render(new PointEditFormView({
    //   allOffers:this.routePointsModel.getOffersByType(),
    //   allDestinations:this.routePointsModel.getDestinations()
    // }), this.routePointListComponent.getElement());
    for (let i = 0; i < this.#boardRoutePoints.length; i++) {
      this.#renderRoutePoint(this.#boardRoutePoints[i]);
    }
  }
}
