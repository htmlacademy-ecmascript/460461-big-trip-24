import { createElement } from '../render';
import { EVENT_TYPES } from '../const';
import { capitalizeFirstLetter } from '../utils';
import { getFormattedDate } from '../utils';

const createEventTypeOption = (type, currentType) => {
  const isChecked = currentType === type ? 'checked' : '';

  return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>`;
};

const createOfferTemplate = (offer, isChecked) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${offer.id}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;

const createOffersSection = (point, offers) => {
  if (!offers || (offers && offers.length === 0)) {
    return '';
  }

  const offersTemplate = offers.map((offer) => createOfferTemplate(offer, point.offerIds.includes(offer.id))).join('');

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>`;
};

const createPhotosTemplate = (pictures) => {
  if (!pictures || pictures.length === 0) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="Event photo">`).join('')}
      </div>
    </div>`;
};

const createFormTemplate = (point, destination, offers, allDestinations) =>
  `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${EVENT_TYPES.map((type) => createEventTypeOption(type)).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalizeFirstLetter(point.type)}
          </label>
          <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination"
            value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${allDestinations.map((dest) => `<option value="${dest.name}"></option>`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
            value="${getFormattedDate(point.dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFormattedDate(point.dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersSection(point, offers)}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          ${createPhotosTemplate(destination.pictures)}
        </section>
      </section>
    </form>
  `;

export default class EditForm {
  constructor(point, pointModel) {
    this.point = point;
    this.pointModel = pointModel;
  }

  getTemplate() {
    const point = this.point;
    const destination = this.pointModel.getDestinationById(point.destinationId);
    const offers = this.pointModel.getOffersByType(point.type);
    const allDestinations = this.pointModel.getAllDestinations();

    return createFormTemplate(point, destination, offers, allDestinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
