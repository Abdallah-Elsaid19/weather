import { useQuery } from '@tanstack/react-query';
import { getLocations, getWeatherForecast } from '../api/weather';

export const useWeather = ({cityName , days}) =>{
  return useQuery({
    queryKey: ["WeatherForeCast", cityName, days],
    queryFn: () => getWeatherForecast({cityName , days}),
    enabled: !!cityName
  })
}

export const useLocations = (cityName) =>{
  return useQuery({
    queryKey: ["Locations", cityName],
    queryFn: () => getLocations({cityName}),
    enabled: !!cityName
  })
}