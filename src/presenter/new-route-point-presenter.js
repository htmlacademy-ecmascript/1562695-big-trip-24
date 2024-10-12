import PointEditFormView from '../view/point-edit-form-view.js';
import { RenderPosition, remove, render } from '../framework/render.js';
import { BlankPoint, UpdateType, UserAction } from '../const.js';
import { nanoid } from 'nanoid';

export default class NewRoutePointPresenter {
  #routePointListComponent = null;
  #routePointsModel = null;
  #routePoint = BlankPoint;
  #handleRoutePointChange = null;
  #handleDestroy = null;
  #editRoutePointComponent = null;

  constructor({routePointListComponent, routePointsModel, onRoutePointChange, onDestroy}) {
    this.#routePointListComponent = routePointListComponent;
    this.#routePointsModel = routePointsModel;
    this.#handleRoutePointChange = onRoutePointChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#editRoutePointComponent !== null) {
      return;
    }
    this.#editRoutePointComponent = new PointEditFormView({
      routePoint: this.#routePoint,
      typeOffers: this.#routePointsModel.getOffersByType(),
      destinationRoutePoint: this.#routePointsModel.getDestinationsById(this.#routePoint.destination),
      allDestinations: this.#routePointsModel.destinations,
      allOffers: this.#routePointsModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onEditRollUp: this.#handleCancelClick,
      onDeleteClick: this.#handleCancelClick,
    });

    render(this.#editRoutePointComponent, this.#routePointListComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editRoutePointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editRoutePointComponent);
    this.#editRoutePointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleRoutePointChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      {...point, id: nanoid()},
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}