import { getRandomInteger } from "../utils.js";

const mockOffers = [
  {
    type: "taxi",
    offers: [
      {
        id: '1',
        title: "Upgrade to a business class",
        price: getRandomInteger(1, 500),
      },
      {
        id: 2,
        title: 'Order Uber',
        price: getRandomInteger(1, 500)
      },
    ],
  },
  {
    type: "Drive",
    offers: [
      {
        id: '1',
        title: "Rent a car",
        price: getRandomInteger(1, 500),
      },
    ],
  },
  {
    type: "Restaurant",
    offers: [
      {
        id: '1',
        title: "Add breakfast",
        price: getRandomInteger(1, 500),
      },
      {
        id: '2',
        title: "Add dinner",
        price: getRandomInteger(1, 500),
      },
    ],
  },
  {
    type: "Sightseeing",
    offers: [
      {
        id: '1',
        title: "Book tickets",
        price: getRandomInteger(1, 500),
      },
      {
        id: '2',
        title: "Lunch in city",
        price: getRandomInteger(1, 500),
      },
    ],
  },
  {
    type: "Flight",
    offers: [
      {
        id: '1',
        title: "Add luggage",
        price: getRandomInteger(1, 500),
      },
      {
        id: '2',
        title: "Switch to comfort",
        price: getRandomInteger(1, 500),
      },
    ],
  },

];



export {mockOffers};
