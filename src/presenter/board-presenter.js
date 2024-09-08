import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import RoutePointListView from '../view/route-point-list-view.js';
import RoutePointView from '../view/route-point-view.js';
import PointEditFormView from '../view/point-edit-form-view.js';
// import LoadMoreButtonView from '../view/load-more-button-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  routePointListComponent = new RoutePointListView();

  constructor({boardContainer, routePointsModel}) {
    this.boardContainer = boardContainer;
    this.routePointsModel = routePointsModel;
  }

  init() {
    this.boardRoutePoints = [...this.routePointsModel.getRoutePoints()];
    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.routePointListComponent, this.boardComponent.getElement());
    // render(new PointEditFormView({
    //   // routePoint: this.boardRoutePoints[0],
    //   // destinationRoutePoint:null,
    //   allOffers:this.routePointsModel.getOffersByType(),
    //   allDestinations:this.routePointsModel.getDestinations()
    // }), this.routePointListComponent.getElement());
    render(new PointEditFormView({
      routePoint: this.boardRoutePoints[0],
      destinationRoutePoint: this.routePointsModel.getDestinationsById(this.boardRoutePoints[0].destination),
      allOffers:this.routePointsModel.getOffersByType(this.boardRoutePoints[0].type),
      allDestinations:this.routePointsModel.getDestinations()
    }), this.routePointListComponent.getElement());

    for (let i = 0; i < this.boardRoutePoints.length; i++) {
      render(new RoutePointView({
        routePoint: this.boardRoutePoints[i],
        offers:[...this.routePointsModel.getOffersById(this.boardRoutePoints[i].type,this.boardRoutePoints[i].offers)],
        destination: this.routePointsModel.getDestinationsById(this.boardRoutePoints[i].destination)
      }), this.routePointListComponent.getElement());
    }

  }
}
