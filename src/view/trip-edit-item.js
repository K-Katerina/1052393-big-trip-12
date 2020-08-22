import {TYPE_TRIP_ITEM_IN, TYPE_TRIP_ITEM_TO, CITY_TRIP, OFFERS, getInOrTo} from "../const";
import {parseTime, parseDate} from "../utils/common";
import AbstractView from "./abstract-view";

const fillTypeGroup = (types) => {
  return types.map((typeTrip) =>
    `<div class="event__type-item">
      <input id="event-type-${typeTrip.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeTrip.toLowerCase()}">
      <label class="event__type-label  event__type-label--${typeTrip.toLowerCase()}" for="event-type-${typeTrip.toLowerCase()}-1">${typeTrip}</label>
    </div>`
  ).join(``);
};

const getOffers = (offers) => {
  if (!offers) {
    offers = OFFERS.slice();
  }
  return offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${offer.checked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${offer.type}-1">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&nbsp;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  ).join(``);
};

const getPhoto = (photos) => {
  return photos.map((photo) =>
    `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
};

const createTripEditItemTemplate = (tripItem) => {
  return (`
    <li class="trip-events__item">
      <form class="trip-events__item event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${tripItem.type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${fillTypeGroup(TYPE_TRIP_ITEM_TO)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                    ${fillTypeGroup(TYPE_TRIP_ITEM_IN)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${tripItem.type} ${getInOrTo(tripItem.type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripItem.city}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${CITY_TRIP.map((city) => `<option value="${city}"></option>\n`).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${parseDate(tripItem.timeBegin)} ${parseTime(tripItem.timeBegin)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${parseDate(tripItem.timeEnd)} ${parseTime(tripItem.timeEnd)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripItem.cost}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${tripItem.favorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${getOffers(tripItem.offers)}
            </div>
          </section>
          <section class="event__section event__section--destination ${tripItem.destination.desc.length + tripItem.destination.photo.length > 0 ? `` : `visually-hidden`}">
            <h3 class="event__section-title event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${tripItem.destination.desc}</p>
            <div class="event__photos-container ${tripItem.destination.photo.length ? `` : `visually-hidden`}">
              <div class="event__photos-tape">
                ${getPhoto(tripItem.destination.photo)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `);
};

export default class TripEditItem extends AbstractView {
  constructor(tripEditItem) {
    super();
    this._tripEditItem = tripEditItem;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  getTemplate() {
    return createTripEditItemTemplate(this._tripEditItem);
  }

  closeEditFormClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  deleteEditFormClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._editClickHandler);
  }

  formEditSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
