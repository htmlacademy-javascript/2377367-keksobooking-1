const getData = (onSuccess, onFail) => {
  fetch('https://28.javascript.htmlacademy.pro/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      onFail('Не удалось загрузить объявления. Попробуйте перезагрузить страницу');
    });
};

const SEND_DATA = (onSuccess, onFail, body) => {
  fetch(
    'https://28.javascript.htmlacademy.pro/keksobooking/data ',
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

export {getData, SEND_DATA};
