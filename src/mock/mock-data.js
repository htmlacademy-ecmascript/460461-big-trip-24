import { Point } from '../model/point';
import { Offer } from '../model/offer';
import { Destination } from '../model/destination';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Amsterdam', 'Chamonix', 'Geneva'];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
function generateMockOffers() {
  return TYPES.flatMap((type) =>
    Array.from(
      { length: 3 },
      () =>
        new Offer({
          id: generateId(),
          type,
          title: `Offer for ${type}`,
          price: Math.floor(Math.random() * 100) + 10,
        })
    )
  );
}

function generateMockDestinations() {
  return CITIES.map(
    (city) =>
      new Destination({
        id: generateId(),
        name: city,
        description: `${city} is a beautiful city.`,
        pictures: [
          {
            src: `https://loremflickr.com/248/152?random=${Math.random()}`,
            description: `${city} photo`,
          },
        ],
      })
  );
}

function generateMockPoints(offers, destinations) {
  return Array.from({ length: 10 }, () => {
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const availableOffers = offers.filter((offer) => offer.type === type);

    return new Point({
      id: generateId(),
      type,
      destinationId: destination.id,
      dateFrom: new Date(),
      dateTo: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000),
      basePrice: Math.floor(Math.random() * 1000) + 20,
      isFavorite: Math.random() > 0.5,
      offerIds: availableOffers.slice(0, Math.floor(Math.random() * availableOffers.length)).map((offer) => offer.id),
    });
  });
}

export function generateMockData() {
  const offers = generateMockOffers();
  const destinations = generateMockDestinations();
  const points = generateMockPoints(offers, destinations);
  console.log(destinations);

  return { offers, destinations, points };
}
