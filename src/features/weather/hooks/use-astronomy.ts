import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../api/weather.service';
import { useAppStore } from '@/shared/stores/app.store';

export const useAstronomy = () => {
  const { currentLocation } = useAppStore();

  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date().toISOString().slice(0, 10)), 60_000);
    return () => clearInterval(timer);
  }, []);

  return useQuery({
    queryKey: ['weather', 'astronomy', currentLocation?.latitude, currentLocation?.longitude, date],
    queryFn: () => {
      if (!currentLocation) return null;
      return WeatherService.getAstronomy(currentLocation.latitude, currentLocation.longitude, date);
    },
    enabled: !!currentLocation,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours, astronomy data doesn't change rapidly
  });
};
