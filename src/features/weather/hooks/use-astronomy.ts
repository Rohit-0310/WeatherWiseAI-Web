import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../api/weather.service';
import { useAppStore } from '@/shared/stores/app.store';

export const useAstronomy = () => {
  const { currentLocation } = useAppStore();

  return useQuery({
    queryKey: ['weather', 'astronomy', currentLocation?.latitude, currentLocation?.longitude],
    queryFn: () => {
      if (!currentLocation) return null;
      return WeatherService.getAstronomy(currentLocation.latitude, currentLocation.longitude);
    },
    enabled: !!currentLocation,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours, astronomy data doesn't change rapidly
  });
};
