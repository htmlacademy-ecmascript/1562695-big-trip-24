
import TripInfoView from './view/trip-info-view.js';
import NewRoutePointButton from './view/new-button-view.js';
import { RenderPosition, render } from './framework/render.js';
import RoutePointListPresenter from './presenter/route-point-list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import RoutePointsModel from './model/route-point-model.js';
import FilterModel from './model/filter-model.js';
import RoutePointsApiService from './server/route-points-api-server.js';

const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic kvw856pbolq';

const siteMainElement = document.querySelector('.trip-main');
const siteSectionElement = document.querySelector('.trip-events');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

const routePointsModel = new RoutePointsModel({
  routePointsApiService: new RoutePointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const RoutePointList = new RoutePointListPresenter({routePointsListContainer: siteSectionElement, routePointsModel, filterModel, onNewRoutePointDestroy: handleNewRoutePointFormClose,});
const filterPresenter = new FilterPresenter({filterContainer: siteFilterElement, filterModel, routePointsModel});
const newRoutePointButtonComponent = new NewRoutePointButton({
  onClick: handleNewRoutePointButtonClick
});
function handleNewRoutePointFormClose() {
  newRoutePointButtonComponent.element.disabled = false;
}

function handleNewRoutePointButtonClick() {
  RoutePointList.createPoint();
  newRoutePointButtonComponent.element.disabled = true;
}

render(new TripInfoView(), siteMainElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();

RoutePointList.init();
routePointsModel.init().finally(() => {
  render(newRoutePointButtonComponent, siteMainElement);
});
