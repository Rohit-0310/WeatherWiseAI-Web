import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../api/weather.service';
import { useAppStore } from '@/shared/stores/app.store';

export const useHourlyForecast = () => {
  const { currentLocation, units } = useAppStore();

  return useQuery({
    queryKey: ['weather', 'hourly', currentLocation?.latitude, currentLocation?.longitude, units],
    queryFn: () => {
      if (!currentLocation) return null;
      return WeatherService.getHourlyForecast(currentLocation.latitude, currentLocation.longitude, units);
    },
    enabled: !!currentLocation,
    staleTime: 1000 * 60 * 15,
  });
};

export const useWeeklyForecast = () => {
  const { currentLocation, units } = useAppStore();

  return useQuery({
    queryKey: ['weather', 'weekly', currentLocation?.latitude, currentLocation?.longitude, units],
    queryFn: () => {
      if (!currentLocation) return null;
      return WeatherService.getWeeklyForecast(currentLocation.latitude, currentLocation.longitude, units);
    },
    enabled: !!currentLocation,
    staleTime: 1000 * 60 * 60,
  });
};
