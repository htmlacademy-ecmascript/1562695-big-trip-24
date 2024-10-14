import ApiService from '../framework/api-service.js';
import AdapterService from './adapter-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
export default class RoutePointsApiService extends ApiService {
  #routePointsAdapterService = new AdapterService();

  get routePoints() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  async updateRoutePoints(routePoints) {
    const response = await this._load({
      url: `points/${routePoints.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#routePointsAdapterService.adaptToServer(routePoints)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addRoutePoint(routePoints) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#routePointsAdapterService.adaptToServer(routePoints)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deleteRoutePoint(routePoints) {
    const response = await this._load({
      url: `points/${routePoints.id}`,
      method: Method.DELETE,
    });
    return response;
  }
}
