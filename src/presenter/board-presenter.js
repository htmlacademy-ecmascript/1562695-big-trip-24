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

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.routePointListComponent, this.boardComponent.getElement());
    render(new PointEditFormView(), this.routePointListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), this.routePointListComponent.getElement());
    }

  }
}
