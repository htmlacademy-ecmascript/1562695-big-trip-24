
import TripInfoView from './view/trip-info-view.js';
import { RenderPosition, render } from './framework/render.js';
import RoutePointListPresenter from './presenter/route-point-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import RoutePointsModel from './model/route-point-model.js';
import FilterModel from './model/filter-model.js';

const siteMainElement = document.querySelector('.trip-main');
const siteSectionElement = document.querySelector('.trip-events');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

const routePointsModel = new RoutePointsModel();
const filterModel = new FilterModel();

const RoutePointList = new RoutePointListPresenter({routePointsListContainer: siteSectionElement, routePointsModel, filterModel});
const filterPresenter = new FilterPresenter({filterContainer: siteFilterElement, filterModel, routePointsModel});

render(new TripInfoView(), siteMainElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();

RoutePointList.init();
