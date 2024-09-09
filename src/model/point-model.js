import { generateMockData } from '../mock/mock';

export class PointModel {
  constructor() {
    const { points, offers, destinations } = generateMockData();
    this.points = points;
    this.offers = offers;
    this.destinations = destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type)?.offers || [];
  }

  getAllDestinations() {
    return this.destinations;
  }
}
