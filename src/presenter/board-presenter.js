import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import PointEditFormView from '../view/point-edit-form-view.js';
// import LoadMoreButtonView from '../view/load-more-button-view.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {

  #boardContainer = null;
  #routePointsModel = null;

  #routePointListComponent = new RoutePointListView();
  #boardComponent = new BoardView();
  #sorting = new SortView();

  #boardRoutePoints = [];


  constructor({boardContainer, routePointsModel}) {
    this.#boardContainer = boardContainer;
    this.#routePointsModel = routePointsModel;
  }

  init() {
    this.#boardRoutePoints = [...this.#routePointsModel.routePoints];
    render(this.#boardComponent, this.#boardContainer);
    render(this.#sorting, this.#boardComponent.element);
    render(this.#routePointListComponent, this.#boardComponent.element);
    // render(new PointEditFormView({
    //   allOffers:this.routePointsModel.getOffersByType(),
    //   allDestinations:this.routePointsModel.getDestinations()
    // }), this.routePointListComponent.getElement());


    for (let i = 0; i < this.#boardRoutePoints.length; i++) {
      this.#renderRoutePoint(this.#boardRoutePoints[i]);
    }

  }

  #renderRoutePoint(routePoint){

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
      offers:[...this.#routePointsModel.getOffersById(routePoint.type,routePoint.offers)],
      destination: this.#routePointsModel.getDestinationsById(routePoint.destination),
      onEditClick: () => showEditorPoint()
    });

    const editRoutePointComponent = new PointEditFormView({
      routePoint,
      destinationRoutePoint: this.#routePointsModel.getDestinationsById(this.#boardRoutePoints[0].destination),
      allOffers:this.#routePointsModel.getOffersByType(this.#boardRoutePoints[0].type),
      allDestinations:this.#routePointsModel.destinations,
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
}
