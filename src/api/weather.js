import axios from "axios";
import { apiKey } from "../constants";

const forecastEndPoint = ({cityName , days}) =>  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=${days}&aqi=no&alerts=no`;
const locationEndPoint = ({cityName}) => `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}`;

const apiCall = async (url) =>{
  const response = await axios.get(url);
  return response.data;
}

export const getWeatherForecast = ({cityName, days}) => 
  apiCall(forecastEndPoint({cityName , days}));

export const getLocations = ({cityName}) => 
  apiCall(locationEndPoint({cityName}));