import FilterView from './view/filter-view.js';
import { render } from './framework/render.js';
import RoutePointListPresenter from './presenter/route-point-list-presenter.js';
import RoutePointsModel from './model/route-point-model.js';
import {generateFilter} from './mock/filter.js';

const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-controls__filters');
const routePointsModel = new RoutePointsModel();
const RoutePointList = new RoutePointListPresenter({routePointsListContainer: siteMainElement, routePointsModel});
const filtersList = generateFilter(routePointsModel.routePoints);

render(new FilterView({filtersList}), siteHeaderElement);

RoutePointList.init();
