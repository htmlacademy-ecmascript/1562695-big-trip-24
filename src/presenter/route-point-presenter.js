import RoutePointView from '../view/route-point-view.js';
import PointEditFormView from '../view/point-edit-form-view.js';
import {remove, render, replace } from '../framework/render.js';
import { Mode, UpdateType, UserAction } from '../const.js';
import { isDatesSame } from '../utils/date-format.js';

export default class RoutePointPresenter {
  #routePointListComponent = null;
  #routePointsModel = null;
  #routePoint = null;
  #mode = Mode.DEFAULT;

  #routePointComponent = null;
  #editRoutePointComponent = null;

  #handleRoutePointChange = null;
  #handleModeChange = null;

  constructor({ routePointListComponent, routePointsModel, onRoutePointChange, onModeChange}) {
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
      typeOffers: this.#routePointsModel.getOffersByType(this.#routePoint.type),
      allDestinations: this.#routePointsModel.destinations,
      allOffers: this.#routePointsModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onEditRollUp: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
      render(this.#routePointComponent, this.#routePointListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#routePointComponent, prevRoutePointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editRoutePointComponent, prevRoutePointEditComponent);
    }

    remove(prevRoutePointComponent);
    remove(prevRoutePointEditComponent);
  }

  resetView() {

    if (this.#mode !== Mode.DEFAULT) {
      this.#editRoutePointComponent.reset();
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
      this.#editRoutePointComponent.reset();
      this.#replaceFormToRoutePoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceFormToRoutePoint(){
    replace(this.#routePointComponent, this.#editRoutePointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #replaceRoutePointToForm(){
    replace(this.#editRoutePointComponent, this.#routePointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #showEditorPoint = () =>{
    this.#replaceRoutePointToForm();
  };

  #handleFormSubmit = (update) => {
    const isPatchUpdate = isDatesSame(this.#routePoint.dateFrom, update.dateFrom) && isDatesSame(this.#routePoint.dateTo, update.dateTo);
    this.#handleRoutePointChange(
      UserAction.UPDATE_POINT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update
    );
    this.#replaceFormToRoutePoint();
  };

  #handleFavoriteClick = () => {
    this.#handleRoutePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#routePoint, isFavorite: !this.#routePoint.isFavorite}
    );
  };

  #handleDeleteClick = (routePoint) => {
    this.#handleRoutePointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      routePoint,
    );
  };
}
