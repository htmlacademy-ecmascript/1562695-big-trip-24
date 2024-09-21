import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeText } from '../utils/common.js';
import {humanizeRoutePointDate} from '../utils/date-format.js';
import { TYPES, BLANK_POINT, FULL_DATE_FORMAT } from '../const';

const createPointEditFormTemplate = (routePoint, destinationRoutePoint, allOffers, allDestinations) => {
  const { basePrice, type, dateFrom, dateTo } = routePoint;
  const typeName = capitalizeText(type);
  const startTime = humanizeRoutePointDate(dateFrom, FULL_DATE_FORMAT);
  const endTime = humanizeRoutePointDate(dateTo, FULL_DATE_FORMAT);
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

  const createAllOffersTemplate = allOffers.offers.map((offerItem) => {
    const isCheckedOfferItem = routePoint.offers.includes(offerItem.id);
    return createOfferItemTemplate(offerItem, isCheckedOfferItem);
  }).join('');

  const createAllDestinationsTemplate = allDestinations.map((desctinationItem) => `<option value="${desctinationItem.name}"></option>`).join('');

  const createPhotoesTemplate = (destinationRoutePoint && destinationRoutePoint.pictures ? destinationRoutePoint.pictures.map((pictureItem) => `<img class="event__photo" src="${pictureItem.src}" alt="Event photo">`).join('') : '');
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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationRoutePoint && destinationRoutePoint.name ? destinationRoutePoint.name : ''}" list="destination-list-1">
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
                  ${allOffers.offers.length > 0 ? `
                    <section class="event__section  event__section--offers">
                      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
                        ${createAllOffersTemplate}
                      </div>
                    </section>` : ''}
                  ${destinationRoutePoint && (destinationRoutePoint.description || createPhotoesTemplate.length > 0) ? `
                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${destinationRoutePoint.description}</p>
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

export default class PointEditFormView extends AbstractView{
  #routePoint = null;
  #destinationRoutePoint = null;

  #allOffers = [];
  #allDestinations = [];

  #handleFormSubmit = null;
  #handleEditRollUp = null;

  constructor({ routePoint = BLANK_POINT, destinationRoutePoint = {}, allOffers, allDestinations, onFormSubmit, onEditRollUp }) {
    super();
    this.#routePoint = routePoint;
    this.#destinationRoutePoint = destinationRoutePoint;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditRollUp = onEditRollUp;

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editRollUpHandler);
  }


  get template() {
    return createPointEditFormTemplate(this.#routePoint, this.#destinationRoutePoint, this.#allOffers, this.#allDestinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#routePoint);
  };

  #editRollUpHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditRollUp(this.#routePoint);
  };
}
