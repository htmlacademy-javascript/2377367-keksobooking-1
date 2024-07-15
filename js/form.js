const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');

const turnOffForm = () => {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const turnOnForm = () => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export { form, turnOffForm, turnOnForm };
