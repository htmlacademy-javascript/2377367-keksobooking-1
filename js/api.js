const ENDPOINT_API = 'https://28.javascript.htmlacademy.pro/keksobooking';
const getData = (onSuccess, onFail) => {
  fetch(`${ENDPOINT_API}/data`)
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      onFail('Не удалось загрузить объявления. Попробуйте перезагрузить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    ENDPOINT_API,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
