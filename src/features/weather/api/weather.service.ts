import { apiClient } from '@/shared/api/axios';
import { CurrentWeather } from '@/shared/types/weather';
import { ApiResponse } from '@/shared/types/location';

export const WeatherService = {
  getCurrentWeather: async (latitude: number, longitude: number, units: string): Promise<CurrentWeather> => {
    const response = await apiClient.get<ApiResponse<CurrentWeather>>('/Weather/current', {
      params: { Latitude: latitude, Longitude: longitude, Units: units },
    });
    
    const data = response.data.data;
    
    return data;
  },

  getHourlyForecast: async (latitude: number, longitude: number, units: string) => {
    const response = await apiClient.get<ApiResponse<any>>('/Weather/hourly', {
      params: { Latitude: latitude, Longitude: longitude, Units: units },
    });
    
    const data = response.data.data;
    
    return data;
  },

  getWeeklyForecast: async (latitude: number, longitude: number, units: string) => {
    const response = await apiClient.get<ApiResponse<any>>('/Weather/forecast', {
      params: { Latitude: latitude, Longitude: longitude, Units: units },
    });
    
    const data = response.data.data;
    
    return data;
  },

  getAstronomy: async (latitude: number, longitude: number) => {
    const response = await apiClient.get<ApiResponse<any>>('/Weather/astronomy', {
      params: { Latitude: latitude, Longitude: longitude },
    });
    return response.data.data;
  },
};
