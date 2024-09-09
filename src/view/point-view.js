import { createElement } from '../render';
import { getDateISO, getDateTime, getShortDate } from '../utils';

const createPointTemplate = (point, destination, offers) => {
  const { dateFrom, dateTo, basePrice, isFavorite, type } = point;

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const offersTemplate = offers
    .map(
      (offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `
    )
    .join('');

  const dateFromDay = getShortDate(dateFrom);

  const dateFromISO = getDateISO(dateFrom);
  const dateToISO = getDateISO(dateTo);
  const dateFromTime = getDateTime(dateFrom);
  const dateToTime = getDateTime(dateTo);

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFromISO}">${dateFromDay}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFromISO}">${dateFromTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateToISO}">${dateToTime}</time>
          </p>
          <p class="event__duration">30M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class PointView {
  constructor(point, pointModel) {
    this.point = point;
    this.pointModel = pointModel;
  }

  getTemplate() {
    const point = this.point;
    const destination = this.pointModel.getDestinationById(point.destinationId);
    const offers = this.pointModel.getOffersByType(point.type);

    return createPointTemplate(point, destination, offers);
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
