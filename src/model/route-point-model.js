import {getRandomPoint} from '../mock/points-route.js';
import {POINT_COUNT, TYPES} from "../const";
import {mockOffers} from "../mock/offers.js";
import {mockDestinations} from "../mock/destinations.js";

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
  getDestinationsById(id){
    const allDestinations=this.getDestinations();
    return allDestinations.find((item)=>item.id==id)
  }
  //getOffersByType(type = TYPES[0].toLowerCase()){
  getOffersByType(type){
    const allOffers=this.getOffers();
    return allOffers.find((item)=>item.type==type)
  }
  getOffersById(type, offersId){
    const offersType=this.getOffersByType(type);
    return offersType.offers.filter((item) => offersId.includes(item.id) )
  }
}
