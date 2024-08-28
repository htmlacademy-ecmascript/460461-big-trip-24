import TripPresenter from './presenter/trip-presenter';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const trip = new TripPresenter({ tripMainContainer, tripEventsContainer });
trip.init();
