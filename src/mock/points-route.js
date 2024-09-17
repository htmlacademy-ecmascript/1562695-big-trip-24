import {getRandomArrayElement, getRandomInteger} from '../utils/common.js';

const mockPoints = [
  {
    type: 'taxi',
    basePrice: getRandomInteger(1, 500),
    destination: getRandomInteger(1, 5),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    isFavorite: false,
    offers:[
      '1','2'
    ]
  },
  {
    type: 'restaurant',
    basePrice: getRandomInteger(1, 500),
    destination: getRandomInteger(1, 5),
    dateFrom: '2019-07-10T22:00:56.845Z',
    dateTo: '2019-07-10T22:22:13.375Z',
    isFavorite: false,
    offers:[
      '2'
    ]
  },
  {
    type: 'sightseeing',
    basePrice: getRandomInteger(1, 500),
    destination: getRandomInteger(1, 5),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-15T11:22:13.375Z',
    isFavorite: false,
    offers:[
      '1','2'
    ]
  },
  {
    type: 'flight',
    basePrice: getRandomInteger(1, 500),
    destination: getRandomInteger(1, 5),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    isFavorite: false,
    offers:[
      '2'
    ]
  },
  {
    type: 'drive',
    basePrice: getRandomInteger(1, 500),
    destination: getRandomInteger(1, 5),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    isFavorite: false,
    offers:[
      '1','2'
    ]
  },
  {
    type: 'sightseeing',
    basePrice: getRandomInteger(1, 500),
    destination: getRandomInteger(1, 5),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-15T11:22:13.375Z',
    isFavorite: false,
    offers:[
      '1','2'
    ]
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
