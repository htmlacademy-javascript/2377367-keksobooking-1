import { getNewCardElement } from './similar.js';
import {generateData} from './data.js';

const data = generateData();
const map = document.querySelector('#map-canvas');
const firstCard = getNewCardElement(data[0]);

map.appendChild(firstCard);
