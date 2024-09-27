import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeText } from '../utils/common.js';
import {humanizeRoutePointDate} from '../utils/date-format.js';
import { TYPES, BlankPoint, FULL_DATE_FORMAT } from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createPointEditFormTemplate = (state, allDestinations) => {
  const { basePrice, type, dateFrom, dateTo, offers, typeOffers, destination } = state;
  const typeName = capitalizeText(type);
  const startTime = humanizeRoutePointDate(dateFrom, FULL_DATE_FORMAT);
  const endTime = humanizeRoutePointDate(dateTo, FULL_DATE_FORMAT);
  const roitePointDestination = allDestinations.find((item) => item.id === destination);
  const { name, description, pictures } = roitePointDestination;
  const createTypeItemTemplate = (typeItem, isCheckedTypeItem) =>
    `
      <div class="event__type-item">
        <input id="event-type-${typeItem.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem.toLowerCase()}" ${isCheckedTypeItem ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${typeItem.toLowerCase()}" for="event-type-${typeItem.toLowerCase()}-1">${typeItem}</label>
      </div>
    `;

  const createOfferItemTemplate = (offerItem, isCheckedOfferItem) =>
    `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="event-offer-${offerItem.id}-1" type="checkbox" name="event-offer-${type.toLowerCase()}" value="${offerItem.id}" ${isCheckedOfferItem ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offerItem.id}-1">
          <span class="event__offer-title">${offerItem.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offerItem.price}</span>
        </label>
      </div>
    `;

  const createTypeListTemplate = TYPES.map((typeItem) => {
    const isCheckedTypeItem = typeItem === typeName;
    return createTypeItemTemplate(typeItem, isCheckedTypeItem);
  }).join('');

  const createAllOffersTemplate = typeOffers.offers.map((offerItem) => {
    const isCheckedOfferItem = offers.includes(offerItem.id);
    return createOfferItemTemplate(offerItem, isCheckedOfferItem);
  }).join('');

  const createAllDestinationsTemplate = allDestinations.map((desctinationItem) => `<option value="${desctinationItem.name}"></option>`).join('');

  const createPhotoesTemplate = (pictures ? pictures.map((pictureItem) => `<img class="event__photo" src="${pictureItem.src}" alt="Event photo">`).join('') : '');
  return `(
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createTypeListTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${typeName}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name ? name : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createAllDestinationsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${typeOffers.offers.length > 0 ? `
                    <section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
                        ${createAllOffersTemplate}
                      </div>
                    </section>` : ''}
                  ${(description || createPhotoesTemplate.length > 0) ? `
                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${description}</p>
                     ${createPhotoesTemplate.length > 0 ? `
                      <div class="event__photos-container">
                        <div class="event__photos-tape">
                          ${createPhotoesTemplate}
                        </div>
                      </div>` : ''}
                      </section>` : ''}
                </section>
              </form>
  )`;
};

export default class PointEditFormView extends AbstractStatefulView{
  #allDestinations = [];
  #allOffers = [];

  #handleFormSubmit = null;
  #handleEditRollUp = null;
  #initialRoutePoint = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #handleDeleteClick = null;

  constructor({ routePoint = BlankPoint, destinationRoutePoint = {}, typeOffers, allDestinations, allOffers, onFormSubmit, onEditRollUp, onDeleteClick}) {
    super();
    this.#initialRoutePoint = routePoint;
    this._setState(PointEditFormView.parseRoutePointToState(routePoint, destinationRoutePoint.id, typeOffers));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditRollUp = onEditRollUp;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();

  }


  get template() {
    return createPointEditFormTemplate(this._state, this.#allDestinations);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editRollUpHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeListChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  removeElement() {
    super.removeElement();
    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }
    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset() {
    this.updateElement({
      ...this.#initialRoutePoint,
      typeOffers: this.#allOffers.find((offer) => offer.type === this.#initialRoutePoint.type),
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditFormView.parseStateToRoutePoint(this._state));
  };

  #editRollUpHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditRollUp(PointEditFormView.parseStateToRoutePoint(this.#initialRoutePoint));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === targetDestination);
    this.updateElement({
      destination: newDestination.id,
      description: newDestination.description,
      name: newDestination.name,
      pictures: newDestination.pictures,
    });
  };

  #typeListChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    const typeOffers = this.#allOffers.find((item) => item.type === targetType);
    this.updateElement({
      type: targetType,
      typeOffers: typeOffers,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;
    this._setState({
      basePrice: newPrice
    });
  };

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo,
      }
    );
  }

  #setDatepickerEnd() {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      }
    );
  }
  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditFormView.parseStateToRoutePoint(this.#initialRoutePoint));
  };

  static parseRoutePointToState(routePoint, destinationRoutePoint, typeOffers) {
    return {
      ...routePoint,
      destination: destinationRoutePoint,
      typeOffers
    };
  }

  static parseStateToRoutePoint(state) {
    const routePoint = {...state};
    return routePoint;
  }
}
