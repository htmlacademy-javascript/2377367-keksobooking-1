import './user-form.js';
import './map.js';
import './filter.js';
import {createAllMarkers} from './map.js';
import {showAlert} from './message.js';
import {getData} from './api.js';
import {setOnFiltersChange} from './filter-user.js';
import {turnOnMapFilters, turnOffMapFilters} from './filter.js';
import {removeAllMarkers} from './map.js';

const ADVERTS_LIMIT = 10;

getData(
  (adverts) => {
    turnOnMapFilters();
    createAllMarkers(adverts.slice(0, ADVERTS_LIMIT));
    setOnFiltersChange({ createAllMarkers, removeAllMarkers }, adverts);
  },
  (errorMessage) => showAlert(errorMessage)
);
turnOffMapFilters();


