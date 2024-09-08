import {getRandomArrayElement, getRandomText, getRandomInteger} from '../utils.js';
import {CITIES, DESCRIPTION_TEXT} from "../const";

const mockDestinations = [
  {
    id:1,
    name:getRandomArrayElement(CITIES),
    description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. `,
    pictures: [
      {
        src:`https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
        description: getRandomText(DESCRIPTION_TEXT)
      }
    ],
  },
  {
    id:2,
    name:getRandomArrayElement(CITIES),
    description:getRandomText(DESCRIPTION_TEXT),
    pictures: [
      {
        src:`https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
        description: getRandomText(DESCRIPTION_TEXT)
      }
    ],
  },
  {
    id:3,
    name:getRandomArrayElement(CITIES),
    description:getRandomText(DESCRIPTION_TEXT),
    pictures: [
      {
        src:`https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
        description: "Chamonix parliament building"
      }
    ],
  },
  {
    id:4,
    name:getRandomArrayElement(CITIES),
    description: getRandomText(DESCRIPTION_TEXT),
    pictures: [
      {
        src:`https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
        description: getRandomText(DESCRIPTION_TEXT)
      }
    ],
  },
  {
    id:5,
    name:getRandomArrayElement(CITIES),
    description: getRandomText(DESCRIPTION_TEXT),
    pictures: [
      {
        src:`https://loremflickr.com/248/152?random=${getRandomInteger(1, 20)}`,
        description: getRandomText(DESCRIPTION_TEXT)
      }
    ],
  },
]




export {mockDestinations};
