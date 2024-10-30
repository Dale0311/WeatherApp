import axios from 'axios';

export const weatherGeoApi = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0/direct',
});

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});
