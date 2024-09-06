import {getRandomPoint} from '../mock/points-route.js';
import {POINT_COUNT} from "../const";
import {mockOffers} from "../mock/offers.js"
import {mockDestinations} from "../mock/destinations.js"

export default class RoutePointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);
  offers = mockOffers;
  destinations = mockDestinations;

  getRoutePoints() {
    return this.points;
  }
  getOffers() {
    return this.offers;
  }
  getDestinations() {
    return this.destinations;
  }
}
