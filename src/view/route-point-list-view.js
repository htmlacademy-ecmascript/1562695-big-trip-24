import AbstractView from '../framework/view/abstract-view.js';

function createRoutePointListTemplate() {
  return '<div class="trip-events__list"></div>';
}

export default class RoutePointListVie extends AbstractView{
  get template() {
    return createRoutePointListTemplate();
  }
}
