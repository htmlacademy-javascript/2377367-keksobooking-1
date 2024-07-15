import './user-form.js';
import './map.js';
import './filter.js';
import {createAllMarkers} from './map.js';
import {showAlert} from './message.js';
import {getData} from './api.js';
import {setOnFiltersChange} from './filter-user.js';
import { turnOnMapFilters, turnOffMapFilters} from './filter.js';


const ADS_LIMIT = 10;

getData(
  (ads) => {
    turnOnMapFilters();
    createAllMarkers(ads.slice(0, ADS_LIMIT));
    setOnFiltersChange({ createAllMarkers, removeAllMarkers }, data);
  },
  (errorMessage) => showAlert(errorMessage)
);
turnOffMapFilters();
