import { generateMockData } from '../mock/mock-data';

export class Model {
  constructor() {
    const { points, offers, destinations } = generateMockData();
    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

  getPointDestination(point) {
    return this.destinations.find((destination) => destination.id === point.destinationId);
  }

  getPointOffers(point) {
    return this.offers.filter((offer) => point.offerIds.includes(offer.id));
  }
}
