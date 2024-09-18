import RoutePointView from '../view/route-point-view.js';
import PointEditFormView from '../view/point-edit-form-view.js';
import {remove, render, replace } from '../framework/render.js';

export default class RoutePointPresenter {
  #routePointListComponent = null;
  #routePointsModel = null;
  #routePoint = null;

  #routePointComponent = null;
  #editRoutePointComponent= null;

  constructor({ routePointListComponent, routePointsModel }) {
    this.#routePointListComponent = routePointListComponent;
    this.#routePointsModel = routePointsModel;
  }

  init(routePoint) {
    this.#routePoint = routePoint;

    const prevRoutePointComponent = this.#routePointComponent;
    const prevRoutePointEditComponent = this.#editRoutePointComponent;

    this.#routePointComponent = new RoutePointView({
      routePoint: this.#routePoint,
      offers: [...this.#routePointsModel.getOffersById(this.#routePoint.type,this.#routePoint.offers),],
      destination: this.#routePointsModel.getDestinationsById(this.#routePoint.destination),
      onEditClick: () => this.#showEditorPoint(),
    });

    this.#editRoutePointComponent = new PointEditFormView({
      routePoint: this.#routePoint,
      destinationRoutePoint: this.#routePointsModel.getDestinationsById(this.#routePoint.destination),
      allOffers: this.#routePointsModel.getOffersByType(this.#routePoint.type),
      allDestinations: this.#routePointsModel.destinations,
      onFormSubmit: () => this.#hideEditorPoint(),
      onEditRollUp: () => this.#hideEditorPoint(),
    });

    if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
      render(this.#routePointComponent, this.#routePointListComponent);
      return;
    }

    if (this.#routePointListComponent.contains(prevRoutePointComponent.element)) {
      replace(this.#routePointComponent, prevRoutePointComponent);
    }

    if (this.#routePointListComponent.contains(prevRoutePointEditComponent.element)) {
      replace(this.#editRoutePointComponent, prevRoutePointEditComponent);
    }

    remove(prevRoutePointComponent);
    remove(prevRoutePointEditComponent);
  }

  destroy() {
    remove(this.#routePointComponent);
    remove(this.#editRoutePointComponent);
  }

  #replaceFormToRoutePoint(){
    replace(this.#routePointComponent, this.#editRoutePointComponent);
  }

  #replaceRoutePointToForm(){
    replace(this.#editRoutePointComponent, this.#routePointComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToRoutePoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  };

  #showEditorPoint(){
    this.#replaceRoutePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #hideEditorPoint(){
    this.#replaceFormToRoutePoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
