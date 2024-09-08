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
  return getRandomArrayElement(textArray).trim();
}

function capitalizeText(text){
  return text.charAt(0).toUpperCase()+text.slice(1);

}

export {getRandomArrayElement, getRandomInteger, getRandomText, capitalizeText};
