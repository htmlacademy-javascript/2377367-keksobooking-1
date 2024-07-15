const ENDPOINT_API = 'https://28.javascript.htmlacademy.pro/keksobooking/data';
const getData = (onSuccess, onFail) => {
  fetch(ENDPOINT_API)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onFail('Не удалось загрузить объявления. Попробуйте перезагрузить страницу');
    });
};

const send = (onSuccess, onFail, body) => {
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

export {getData, send};
