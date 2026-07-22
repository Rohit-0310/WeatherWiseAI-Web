import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../api/weather.service';
import { useAppStore } from '@/shared/stores/app.store';

export const useCurrentWeather = () => {
  const { currentLocation, units } = useAppStore();

  return useQuery({
    queryKey: ['weather', 'current', currentLocation?.latitude, currentLocation?.longitude, units],
    queryFn: () => {
      if (!currentLocation) return null;
      return WeatherService.getCurrentWeather(currentLocation.latitude, currentLocation.longitude, units);
    },
    enabled: !!currentLocation,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 15, // Refetch every 15 mins automatically
  });
};
