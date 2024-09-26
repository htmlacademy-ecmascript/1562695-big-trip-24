const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const CITIES = ['Amsterdam','Paris', 'London', 'Madrid', 'Lissabon', 'Rome', 'Helsinki' ];
const DESCRIPTION_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const POINT_COUNT = 6;
const DEFAULT_TYPE = 'Flight';
const BlankPoint = {
  type: DEFAULT_TYPE,
  basePrice: 0,
  destination: null,
  dateFrom: null,
  dateTo:null,
  isFavorite: false,
  offers:[]
};
const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
const EmptyListText = {
  'EVERYTHING' : 'Click New Event to create your first point',
  'PAST' : 'There are no past events now',
  'PRESENT' : 'There are no present events now',
  'FUTURE' : 'There are no future events now',
  'LOADING' : 'Loading...',
  'LOADING_FAILED' : 'Failed to load latest route information',
};
const SortType = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFERS: 'Offers'
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
};

export {TYPES, CITIES, DESCRIPTION_TEXT, POINT_COUNT, DEFAULT_TYPE, BlankPoint, DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT, EmptyListText, SortType, Mode, DISABLED_SORT_TYPES, UserAction, UpdateType};
