import {getType} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getNewCardElement = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.addres;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  const featuresItems = cardElement.querySelectorAll('.popup__feature');
  const featuresList = cardElement.querySelector('.popup__features');

  if (card.offer.features) {
    const modifiers = card.offer.features.map((feature) => `popup__feature--${ feature }`);
    featuresItems.forEach((item) => {
      const modifier = item.classList[1];
      if (! modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    featuresList.style.display = 'none';
  }

  cardElement.querySelector('.popup__description').textContent = card.offer.description || 'Описание отсутствует';

  const photoTemplate = cardElement.querySelector('.popup__photo');
  const photosList = cardElement.querySelector('.popup__photos');
  const fragment = document.createDocumentFragment();

  if (card.offer.photos) {
    card.offer.photos.map((src) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = src;
      fragment.appendChild(photo);
    });
    photosList.children[0].remove();
    photosList.appendChild(fragment);
  } else {
    photosList.style.display = 'none';
  }
  return cardElement;
};

export {getNewCardElement};


