import { createElement } from '../render.js';
import PointView from './point-view.js';
import EditFormView from './edit-form-view.js';

const createListTemplate = (points, pointModel) => {
  const pointElements = points
    .map((point, index) => {
      if (index === 0) {
        // Форма редактирования для 1-ой точки
        const editFormView = new EditFormView(point, pointModel);
        return editFormView.getTemplate();
      } else {
        // Остальные точки маршрута
        const pointView = new PointView(point, pointModel);
        return pointView.getTemplate();
      }
    })
    .join('');

  return `
    <ul class="trip-events__list">
        ${pointElements}
    </ul>`;
};

export default class ListView {
  constructor(points, pointModel) {
    this.points = points;
    this.pointModel = pointModel;
  }

  getTemplate() {
    return createListTemplate(this.points, this.pointModel);
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
