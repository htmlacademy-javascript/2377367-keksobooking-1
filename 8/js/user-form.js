const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(
  adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
  },
  true
);

const rooms = adForm.querySelector('#room_number');
const guests = adForm.querySelector('#capacity');
const ROOMS_CAPACITY = {
  1 : ['1'],
  2 : ['1', '2'],
  3 : ['1', '2', '3'],
  100 : ['0']
};

const GUESTS_CAPACITY = {
  0 : ['100'],
  1 : ['1', '2', '3'],
  2 : ['2', '3'],
  3 : ['3']
};

function validateGuests () {
  return ROOMS_CAPACITY[rooms.value].includes(guests.value);
}

function validateRooms () {
  return GUESTS_CAPACITY[guests.value].includes(rooms.value);
}

function getGuestsErrorMessage () {
  return `Количество комнат (${rooms.value}) не позволяет разместить такое количество гостей (${guests.value})`;
}

pristine.addValidator(guests, validateGuests, getGuestsErrorMessage);
pristine.addValidator(rooms, validateRooms, getGuestsErrorMessage);

rooms.addEventListener('change', onRoomsGuestsChange);
guests.addEventListener('change', onRoomsGuestsChange);

function onRoomsGuestsChange () {
  pristine.validate(rooms);
  pristine.validate(guests);
}


const typeOfHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const TYPE_COSTS = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

function setMinPrice () {
  price.setAttribute('placeholder', TYPE_COSTS[typeOfHousing.value]);
  price.setAttribute('min', TYPE_COSTS[typeOfHousing.value]);
}

typeOfHousing.addEventListener('change', setMinPrice);

function validatePrice () {
  return Number(price.value) > Number(TYPE_COSTS[typeOfHousing.value]);
}

function getPriceErrorMessage () {
  return `Цена выбранного типа жилья не менее ${TYPE_COSTS[typeOfHousing.value]} рублей за ночь`;
}

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

typeOfHousing.addEventListener('change', onTypeOfHousingChange);

function onTypeOfHousingChange () {
  pristine.validate(price);
}

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

function onSetTimeOut () {
  timeOut.value = timeIn.value;
}

function onSetTimeIn () {
  timeIn.value = timeOut.value;
}

timeIn.addEventListener('change', onSetTimeOut);
timeOut.addEventListener('change', onSetTimeIn);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
