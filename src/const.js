const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const MAX_COUNT_DESTINATIONS = 3;
const DEFAULT_TYPE = 'flight';
const BlankPoint = {
  type: DEFAULT_TYPE,
  basePrice: 0,
  destination: null,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  offers:[],
};
const DateFormat = {
  DATE_FORMAT: 'MMM D',
  TIME_FORMAT: 'HH:mm',
  FULL_DATE_FORMAT: 'DD/MM/YY HH:mm',
  DATE_FOR_TRIP_INFO: 'D MMM',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};
const FilterType = {
  EVERYTHING: 'Everything',
  PAST: 'Past',
  PRESENT: 'Present',
  FUTURE: 'Future',
};
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
const DISABLED_SORT_TYPES = [SortType.OFFERS, SortType.EVENT];
const UserAction = {
  UPDATE_POINT: 'UPDATE_ROUTE_POINT',
  ADD_POINT: 'ADD_ROUTE_POINT',
  DELETE_POINT: 'DELETE_ROUTE_POINT',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
const EmptyListText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  LOADING: 'Loading...',
  LOADING_ERROR: 'Failed to load latest route information'
};

const ValidationStyle = {
  FOR_BORDER: 'border: 1px solid red; border-radius: 3px',
  FOR_TEXT_COLOR: 'color: red',
};
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {TYPES, DEFAULT_TYPE, BlankPoint, DateFormat, EmptyListText, SortType, FilterType, Mode, DISABLED_SORT_TYPES, UserAction, UpdateType, ValidationStyle, TimeLimit, MAX_COUNT_DESTINATIONS};
