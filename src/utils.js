function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomText(text){
  const textArray = text.split('.');
  const randomText = Array.from({ length: 5 }, getRandomArrayElement(textArray).trim()).join('.');
  return randomText;
}

export {getRandomArrayElement, getRandomInteger, getRandomText};
