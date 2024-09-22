import { getRandomInteger } from '../utils/common.js';

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Upgrade to a business class',
        price: getRandomInteger(1, 500),
      },
      {
        id: '2',
        title: 'Order Uber',
        price: getRandomInteger(1, 500)
      },
    ],
  },
  {
    type: 'bus',
    offers: []
  },
  {
    type: 'train',
    offers: []
  },
  {
    type: 'ship',
    offers: []
  },
  {
    type: 'drive',
    offers: [
      {
        id: '1',
        title: 'Rent a car',
        price: getRandomInteger(1, 500),
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: '1',
        title: 'Add luggage',
        price: getRandomInteger(1, 500),
      },
      {
        id: '2',
        title: 'Switch to comfort',
        price: getRandomInteger(1, 500),
      },
    ],
  },
  {
    type: 'check-in',
    offers: []
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '1',
        title: 'Book tickets',
        price: getRandomInteger(1, 500),
      },
      {
        id: '2',
        title: 'Lunch in city',
        price: getRandomInteger(1, 500),
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '1',
        title: 'Add breakfast',
        price: getRandomInteger(1, 500),
      },
      {
        id: '2',
        title: 'Add dinner',
        price: getRandomInteger(1, 500),
      },
    ],
  },

  

];

export {mockOffers};
