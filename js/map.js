import { turnOnForm, formElement} from './form.js';
import { turnOnMapFilters} from './filter.js';
import {getNewCardElement} from './similar.js';

const resetButton = document.querySelector('.ad-form__reset');
const adress = document.querySelector('#address');

// Координаты центра Токио
const COORDINATES_CENTER_TOKYO = {
  lat: 35.67325,
  lng: 139.75908,
};

//  СОЗДАНИЕ КАРТЫ И АКТИВАЦИЯ ФОРМЫ И ФИЛЬТРОВ
const map = L.map('map-canvas')
  .on('load', turnOnForm)
  .on('load', turnOnMapFilters)
  .setView({
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

map.on('load', turnOnForm());
map.on('load', turnOnMapFilters());

// СОЗДАНИЕ ОСНОВНОГО МАРКЕРА
const mainPinIcon = L.icon({
  iconUrl: './/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// ПЕРЕДАЕМ КООРДИНАТЫ МАРКЕРА В АДРЕС - РЕШЕНИЕ НЕВЕРНОЕ
mainPinMarker.on('move', (evt) => {
  const addressLat = evt.target.getLatLng().lat.toFixed(5);
  const addressLng = evt.target.getLatLng().lng.toFixed(5);
  adress.value = `${ addressLat } ${ addressLng }`;

  formElement.addEventListener('reset', () => {
    mainPinMarker.setLatLng(L.latLng(COORDINATES_CENTER_TOKYO.lat, COORDINATES_CENTER_TOKYO.lng));
  });
});


// СБРОС СОСТОЯНИЯ МАРКЕРА И КАРТЫ
const handlerResetMainMarker = function () {
  mainPinMarker.setLatLng({
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  });

  map.setView({
    lat: COORDINATES_CENTER_TOKYO.lat,
    lng: COORDINATES_CENTER_TOKYO.lng,
  }, 11);
};

resetButton.addEventListener('click', handlerResetMainMarker);

// СОЗДАНИЕ МАРКЕРОВ С ОБЪЯВЛЕНИЯМИ
const pinIcon = L.icon({
  iconUrl: './/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = function (popupCard) {
  const {location} = popupCard;
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(getNewCardElement(popupCard));
};

const createAllMarkers = function (arr) {
  arr.forEach((popupCard) => {
    createMarker(popupCard);
  });
};

export {createAllMarkers, handlerResetMainMarker};
