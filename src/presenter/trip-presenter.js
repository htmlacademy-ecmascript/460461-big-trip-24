import { render } from '../render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EditFormView from '../view/edit-form-view';
import RoutePointView from '../view/route-point-view';
import { Model } from '../model/model';

export default class TripPresenter {
  constructor({ tripMainContainer, tripEventsContainer }) {
    this.tripMainContainer = tripMainContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.model = new Model();

    this.sortElement = new SortView();
    this.filtersComponent = new FiltersView();
    this.routePointComponents = [];

    this.routeListElement = null;
  }

  init() {
    this.renderFilters();
    this.renderSort();
    this.renderRouteList();
  }

  renderFilters() {
    const filtersContainer = this.tripMainContainer.querySelector('.trip-controls__filters');
    render(this.filtersComponent, filtersContainer);
  }

  renderSort() {
    render(this.sortElement, this.tripEventsContainer);
  }

  renderRouteList() {
    this.routeListElement = document.createElement('ul');
    this.routeListElement.classList.add('trip-events__list');
    this.tripEventsContainer.appendChild(this.routeListElement);

    // Точки маршрута
    const points = this.model.points;

    // Форма редактирования для 1-ой точки
    if (points.length > 0) {
      const firstPoint = points[0];
      const destination = this.model.getPointDestination(firstPoint);
      const selectedPointOffers = this.model.getPointOffers(firstPoint);
      const editFormComponent = new EditFormView(firstPoint, destination, this.model.destinations, selectedPointOffers, this.model.offers);
      render(editFormComponent, this.routeListElement);
    }

    // Остальные точки маршрута
    points.forEach((point, index) => {
      // Пропускаем первую точку, так как она уже отрендерена как форма редактирования
      if (index === 0) {
        return;
      }
      this.renderRoutePoint(point);
    });
  }

  renderRoutePoint(point) {
    const destination = this.model.getPointDestination(point);
    const offers = this.model.getPointOffers(point);
    const routePointComponent = new RoutePointView(point, destination, offers);
    this.routePointComponents.push(routePointComponent);
    render(routePointComponent, this.routeListElement);
  }
}
