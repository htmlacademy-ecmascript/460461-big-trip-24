import { createElement } from '../render';
import { FILTER_TYPES } from '../const';
import { capitalizeFirstLetter } from '../utils';

const createFilterOption = (type) =>
  `
    <div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
      <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
    </div>
`;

const createFiltersTemplate = () =>
  `
    <form class="trip-filters" action="#" method="get">

      ${FILTER_TYPES.map((type) => createFilterOption(type)).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;

export default class FiltersView {
  getTemplate() {
    return createFiltersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElemtnt() {
    this.element = null;
  }
}
