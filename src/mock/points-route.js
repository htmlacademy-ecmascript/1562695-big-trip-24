import {getRandomElements , getRandomInteger} from '../utils/common.js';

const mockPoints = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
    type: 'flight',
    basePrice: getRandomInteger(1, 500),
    destination: getRandomInteger(1, 5),
    dateFrom: '2019-07-09T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    isFavorite: false,
    offers:[
      '2'
    ]
  },
  {
    id: 5,
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
    id: 6,
    type: 'sightseeing',
    basePrice: getRandomInteger(1, 500),
    destination: getRandomInteger(1, 5),
    dateFrom: '2019-07-13T22:55:56.845Z',
    dateTo: '2019-07-15T11:22:13.375Z',
    isFavorite: false,
    offers:[
      '1','2'
    ]
  },
];

const getRandomPoints = getRandomElements(mockPoints);

export {getRandomPoints};
