const PHOTO_TYPES = ['jpg', 'jpeg', 'png'];

const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = PHOTO_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhoto.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.style.maxWidth = '100%';
    photo.style.height = 'auto';
    previewPhoto.append(photo);
  }
});

const resetPhoto = () => {
  previewPhoto.innerHTML = '';
};

export {resetPhoto};
