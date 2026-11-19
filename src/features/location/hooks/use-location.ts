import { useQuery } from '@tanstack/react-query';
import { LocationService } from '../api/location.service';

export const useLocationSearch = (query: string) => {
  return useQuery({
    queryKey: ['locations', 'search', query],
    queryFn: () => LocationService.searchLocations(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 60, // 1 hour (locations don't change often)
  });
};

export const useReverseGeocode = (latitude: number | null, longitude: number | null) => {
  return useQuery({
    queryKey: ['locations', 'reverse', latitude, longitude],
    queryFn: () => {
      if (latitude === null || longitude === null) return null;
      return LocationService.reverseGeocode(latitude, longitude);
    },
    enabled: latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 60,
  });
};
