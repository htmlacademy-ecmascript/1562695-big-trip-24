import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import RoutePointsModel from './model/route-point-model.js';

const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-controls__filters');
const routePointsModel = new RoutePointsModel();
const boardPresenter = new BoardPresenter({boardContainer: siteMainElement, routePointsModel});

render(new FilterView(), siteHeaderElement);

boardPresenter.init();
