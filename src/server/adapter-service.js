export default class AdapterService {
  adaptToServer(routePoint) {
    const adaptedRoutePoint = {...routePoint,
      'base_price': routePoint.basePrice,
      'date_from': routePoint.dateFrom instanceof Date ? routePoint.dateFrom.toISOString() : null,
      'date_to': routePoint.dateTo instanceof Date ? routePoint.dateTo.toISOString() : null,
      'is_favorite': routePoint.isFavorite,
    };
    delete adaptedRoutePoint.basePrice;
    delete adaptedRoutePoint.dateFrom;
    delete adaptedRoutePoint.dateTo;
    delete adaptedRoutePoint.isFavorite;
    return adaptedRoutePoint;
  }

  adaptToClient(routePoint) {
    const adaptedRoutePoint = {...routePoint,
      basePrice: routePoint['base_price'],
      dateFrom: routePoint['date_from'] !== null ? new Date(routePoint['date_from']) : routePoint['date_from'],
      dateTo: routePoint['date_to'] !== null ? new Date(routePoint['date_to']) : routePoint['date_to'],
      isFavorite: routePoint['is_favorite'],
    };
    delete adaptedRoutePoint['base_price'];
    delete adaptedRoutePoint['date_from'];
    delete adaptedRoutePoint['date_to'];
    delete adaptedRoutePoint['is_favorite'];
    return adaptedRoutePoint;
  }
}
