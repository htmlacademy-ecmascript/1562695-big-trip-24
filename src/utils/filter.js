import {isFutureEvent, isPastEvent, isTodayEvent} from '../utils/date-format.js';

const filter = {
  'everything': (routePoints) => routePoints,
  'future': (routePoints) => routePoints.filter((routePoint)=>isFutureEvent(routePoint.dateFrom)),
  'past':(routePoints) => routePoints.filter((routePoint)=>isPastEvent(routePoint.dateTo)),
  'present':(routePoints) => routePoints.filter((routePoint)=>isTodayEvent(routePoint.dateFrom, routePoint.dateTo)),
};
export {filter};
