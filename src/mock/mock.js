import { EVENT_TYPES } from '../const';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function randomInt(int) {
  return Math.floor(Math.random() * int);
}

// Генерация предложений
function generateMockOffers() {
  return EVENT_TYPES.map((type) => ({
    type,
    offers: Array.from({ length: randomInt(5) }, () => ({
      id: generateId(),
      title: `Offer for ${type}`,
      price: randomInt(200) + 10,
    })),
  }));
}

// Генерация городов назначения
function generateMockDestinations() {
  const CITIES = ['Amsterdam', 'Barcelona', 'Berlin', 'Paris', 'Rome', 'London', 'Vienna', 'Prague', 'Madrid', 'Venice'];
  const DESCRIPTIONS = [
    'a true pearl',
    'is a beautiful city',
    'famous for its crowded street markets with the best street food',
    'a perfect place to stay with a family',
    'for those who value comfort and coziness',
    'with a beautiful old town',
    'a paradise',
    'with an embankment of a mighty river as a centre of attraction',
    'full of cozy canteens where you can try the best coffee',
    'known for its vibrant nightlife and cultural scene',
  ];

  return CITIES.map((city) => ({
    id: generateId(),
    name: city,
    description: `${city} - ${DESCRIPTIONS[randomInt(DESCRIPTIONS.length)]}`,
    pictures: Array.from({ length: randomInt(7) }, () => ({
      src: `http://loremflickr.com/248/152?random=${Math.random()}`,
      description: `${city} photo`,
    })),
  }));
}

// Генерация 10 точек маршрута
function generateMockPoints(offers, destinations) {
  return Array.from({ length: 10 }, () => {
    const type = EVENT_TYPES[randomInt(EVENT_TYPES.length)];
    const destination = destinations[randomInt(destinations.length)];
    const availableOffers = offers.filter((offer) => offer.type === type);

    return {
      id: generateId(),
      type,
      destinationId: destination.id,
      dateFrom: new Date(),
      dateTo: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000),
      basePrice: randomInt(1000) + 20,
      isFavorite: Math.random() > 0.5,
      offerIds: availableOffers.slice(0, randomInt(availableOffers.length)).map((offer) => offer.id),
    };
  });
}

export function generateMockData() {
  const offers = generateMockOffers();
  const destinations = generateMockDestinations();
  const points = generateMockPoints(offers, destinations);

  return { offers, destinations, points };
}
