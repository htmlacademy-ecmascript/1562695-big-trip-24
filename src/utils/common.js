

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
const getRandomElements = (items) => {
  const startFrom = Math.floor(Math.random() * items.length - 5);
  const endTo = items.length;
  return items.slice(startFrom, endTo);
};

function getRandomInteger(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomText(text){
  const textArray = text.split('.');
  return getRandomArrayElement(textArray).trim();
}

function capitalizeText(text){
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomArrayElement, getRandomInteger, getRandomText, capitalizeText, updateItem, getRandomElements};
