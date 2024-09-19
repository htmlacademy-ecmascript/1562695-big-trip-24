import RoutePointView from '../view/route-point-view.js';
import PointEditFormView from '../view/point-edit-form-view.js';
import {remove, render, replace } from '../framework/render.js';
import { MODE } from '../const.js';

export default class RoutePointPresenter {
  #routePointListComponent = null;
  #routePointsModel = null;
  #routePoint = null;
  #mode = MODE.DEFAULT;

  #routePointComponent = null;
  #editRoutePointComponent= null;

  #handleRoutePointChange = null;
  #handleModeChange  = null;

  constructor({ routePointListComponent, routePointsModel,  onRoutePointChange, onModeChange}) {
    this.#routePointListComponent = routePointListComponent;
    this.#routePointsModel = routePointsModel;
    this.#handleRoutePointChange = onRoutePointChange;
    this.#handleModeChange = onModeChange;
  }

  init(routePoint) {
    this.#routePoint = routePoint;

    const prevRoutePointComponent = this.#routePointComponent;
    const prevRoutePointEditComponent = this.#editRoutePointComponent;

    this.#routePointComponent = new RoutePointView({
      routePoint: this.#routePoint,
      offers: [...this.#routePointsModel.getOffersById(this.#routePoint.type,this.#routePoint.offers),],
      destination: this.#routePointsModel.getDestinationsById(this.#routePoint.destination),
      onEditClick: this.#showEditorPoint,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editRoutePointComponent = new PointEditFormView({
      routePoint: this.#routePoint,
      destinationRoutePoint: this.#routePointsModel.getDestinationsById(this.#routePoint.destination),
      allOffers: this.#routePointsModel.getOffersByType(this.#routePoint.type),
      allDestinations: this.#routePointsModel.destinations,
      onFormSubmit: this.#hideEditorPoint,
      onEditRollUp: this.#hideEditorPoint,
    });

    if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
      render(this.#routePointComponent, this.#routePointListComponent);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#routePointComponent, prevRoutePointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#editRoutePointComponent, prevRoutePointEditComponent);
    }

    remove(prevRoutePointComponent);
    remove(prevRoutePointEditComponent);
  }

  resetView() {

    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToRoutePoint();
    }
  }

  destroy() {
    remove(this.#routePointComponent);
    remove(this.#editRoutePointComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToRoutePoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  };

  #replaceFormToRoutePoint(){
    replace(this.#routePointComponent, this.#editRoutePointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODE.DEFAULT;
  }

  #replaceRoutePointToForm(){
    replace(this.#editRoutePointComponent, this.#routePointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = MODE.EDITING
  }



  #showEditorPoint = () =>{
    this.#replaceRoutePointToForm();

  }

  #hideEditorPoint = (routePoint) => {
    this.#handleRoutePointChange(routePoint);
    this.#replaceFormToRoutePoint();
  }

  #handleFavoriteClick = () => {
    this.#handleRoutePointChange({...this.#routePoint, isFavorite: !this.#routePoint.isFavorite});
  };
}
