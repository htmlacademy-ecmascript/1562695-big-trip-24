import {filter} from '../utils/filter.js';

const generateFilter = (routePoints) => Object.entries(filter).map(([filterType, filterRoutePoints])=>({
    type:filterType,
    count:filterRoutePoints(routePoints).length
}))

export {generateFilter}