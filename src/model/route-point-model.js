import {getRandomPoints } from '../mock/points-route.js';
import {DEFAULT_TYPE} from '../const';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destinations.js';

export default class RoutePointsModel {
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

  getOffersByType(type = DEFAULT_TYPE.toLowerCase()){
    const allOffers = this.offers;
    return allOffers.find((item)=>item.type === type);
  }

  getOffersById(type, offersId){
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item)=>offersId.includes(item.id));
  }
}
