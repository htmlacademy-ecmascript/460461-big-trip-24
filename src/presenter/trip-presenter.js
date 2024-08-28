import { render } from '../render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EditForm from '../view/edit-form-view';
import RoutePointView from '../view/route-point-view';

export default class TripPresenter {
  constructor({ tripMainContainer, tripEventsContainer }) {
    this.tripMainContainer = tripMainContainer;
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    this.renderFilters();
    this.renderSort();
    this.renderRouteList();
  }

  renderFilters() {
    const filtersContainer = this.tripMainContainer.querySelector('.trip-controls__filters');
    const filtersComponent = new FiltersView();
    render(filtersComponent, filtersContainer);
  }

  renderSort() {
    const sortElement = new SortView();
    render(sortElement, this.tripEventsContainer);
  }

  renderRouteList() {
    const ROUTE_POINTS_COUNT = 3;

    const routeListElement = document.createElement('ul');
    routeListElement.classList.add('trip-events__list');
    this.tripEventsContainer.appendChild(routeListElement);

    // Форма редактирования
    const editFormElement = new EditForm();
    render(editFormElement, routeListElement);

    // Точка маршрута
    for (let i = 0; i < ROUTE_POINTS_COUNT; i++) {
      const pointElement = new RoutePointView();
      render(pointElement, routeListElement);
    }
  }
}
