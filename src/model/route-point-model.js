import {getRandomPoints } from '../mock/points-route.js';
import {DEFAULT_TYPE} from '../const';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destinations.js';
import Observable from '../framework/observable.js';

export default class RoutePointsModel extends Observable {
  #points = getRandomPoints;
  #offers = mockOffers;
  #destinations = mockDestinations;

  get routePoints() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationsById(id){
    const allDestinations = this.destinations;
    return allDestinations.find((item)=>item.id === id);
  }

  getOffersByType(type = DEFAULT_TYPE){
    const allOffers = this.offers;
    return allOffers.find((item)=>item.type === type);
  }

  getOffersById(type, offersId){
    const offersType = this.getOffersByType(type.toLowerCase());
    return offersType.offers.filter((item)=>offersId.includes(item.id));
  }

  updateRoutePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  addRoutePoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  deleteRoutePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
