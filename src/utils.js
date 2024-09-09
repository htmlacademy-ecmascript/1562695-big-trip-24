import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function humanizeRoutePointDate(routePointDate, FORMAT_TO_DATE){
  return routePointDate ? dayjs(routePointDate).format(FORMAT_TO_DATE) : '';
}

function calculateDiffTime(routePointDateStart, routePointDateEnd){
  if(routePointDateStart && routePointDateEnd){
    const dateStart = dayjs(routePointDateStart);
    const dateEnd = dayjs(routePointDateEnd);
    const durationInUnits = dayjs.duration(dateEnd.diff(dateStart));
    const { $d } = durationInUnits;
    if ($d.months > 0) {
      const monthsInMil = dayjs.duration($d.months, 'month');
      $d.days += dayjs.duration(monthsInMil.$ms).asDays();
    }
    if($d.days > 0) {
      return durationInUnits.format('DD[D] HH[H] mm[M]');
    }
    if($d.hours > 0) {
      return durationInUnits.format('HH[H] mm[M]');
    }
    return durationInUnits.format('mm[M]');
  }
  return '';
}

export {getRandomArrayElement, getRandomInteger, getRandomText, capitalizeText,humanizeRoutePointDate, calculateDiffTime};
