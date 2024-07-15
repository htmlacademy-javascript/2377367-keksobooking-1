import {removeAllMarkers} from './map.js';
import {debounce} from './debounce.js';
import {createAllMarkers} from './map.js';

const OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

const Price = {
  MIDDLE: 10000,
  HIGH: 50000,
};

const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
const housingPrice = filtersForm.querySelector('#housing-price');
const housingRooms = filtersForm.querySelector('#housing-rooms');
const housingGuests = filtersForm.querySelector('#housing-guests');
const housingFeatures = filtersForm.querySelectorAll('.map__checkbox');

const filterType = (offer, type) =>
  type === 'any' || offer.offer.type === type;


const filterPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < Price.MIDDLE;
    case 'MIDDLE':
      return offer.offer.price >= Price.MIDDLE && offer.offer.price < Price.HIGH;
    case 'HIGH':
      return offer.offer.price >= Price.HIGH;
  }
};

const filterRooms = (offer, rooms) =>
  rooms === 'any' || offer.offer.rooms === Number(rooms);

const filterGuests = (offer, guests) =>
  guests === 'any' || offer.offer.guests === Number(guests);

const filterFeatures = (offer, features) => {
  if (!features.length) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }
  return features.every((feature) => offer.offer.features.includes(feature));
};

const getFilteredOffersByType = (offers) => {
  const filteredOffers = [];
  const selectedType = housingType.value;
  const selectedPrice = housingPrice.value;
  const selectedRooms = housingRooms.value;
  const selectedGuests = housingGuests.value;
  const selectedFeatures = [];
  housingFeatures.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });

  for (const offer of offers) {
    if (filteredOffers.length > OFFER_COUNT) {
      break;
    }
    if (
      filterType(offer, selectedType) &&
      filterPrice(offer, selectedPrice) &&
      filterRooms(offer, selectedRooms) &&
      filterGuests(offer, selectedGuests) &&
      filterFeatures(offer, selectedFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const setOnFiltersChange = ({ createAllMarkers, removeAllMarkers }, offers) =>{
  filtersForm.addEventListener('change', debounce(() => {
    createAllMarkers();
    removeAllMarkers();
    cb(getFilteredOffersByType(offers));
  }
  , RERENDER_DELAY)
  );
};

export {setOnFiltersChange};

