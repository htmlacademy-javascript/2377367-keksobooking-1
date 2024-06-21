import './user-form.js';
import './map.js';
import './filter.js';
import {createAllMarkers} from './map.js';
import {showAlert} from './message.js';
import {getData} from './api.js';
import {setOnFiltersChange} from './filter-user.js';


const ADS_NUM = 10;

getData(
  (ads) => {
    createAllMarkers(ads.slice(0, ADS_NUM));
    setOnFiltersChange(createAllMarkers, ads);
  },
  () => showAlert('Не удалось загрузить объявления. Попробуйте перезагрузить страницу')
);
