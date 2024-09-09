import { render } from '../render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import ListView from '../view/list-view';
import { PointModel } from '../model/point-model';

export default class TripPresenter {
  constructor({ tripMainContainer, tripEventsContainer }) {
    this.tripMainContainer = tripMainContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.pointModel = new PointModel();
    this.ListComponent = null;

    this.routePointComponents = [];
  }

  init() {
    this.renderFilters();
    this.renderSort();
    this.renderRouteList();
  }

  renderFilters() {
    const filtersContainer = this.tripMainContainer.querySelector('.trip-controls__filters');
    render(new FiltersView(), filtersContainer);
  }

  renderSort() {
    render(new SortView(), this.tripEventsContainer);
  }

  renderRouteList() {
    const points = this.pointModel.points;
    render(new ListView(points, this.pointModel), this.tripEventsContainer);
  }
}
