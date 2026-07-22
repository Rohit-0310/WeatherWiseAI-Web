import { apiClient } from '@/shared/api/axios';
import { Location, ApiResponse } from '@/shared/types/location';

export const LocationService = {
  searchLocations: async (query: string): Promise<Location[]> => {
    const response = await apiClient.get<ApiResponse<Location[]>>('/Location/search', {
      params: { query, count: 5 },
    });
    return response.data.data;
  },

  reverseGeocode: async (latitude: number, longitude: number): Promise<Location | null> => {
    const response = await apiClient.get<ApiResponse<Location>>('/Location/reverse', {
      params: { latitude, longitude },
    });
    return response.data.data;
  },
};
