import { apiClient } from '@/shared/api/axios';
import { CurrentWeather, HourlyForecastResponse, WeeklyForecastResponse, AstronomyResponse, AiSummaryRequest, AiSummaryResponse } from '@/shared/types/weather';
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
    const response = await apiClient.get<ApiResponse<HourlyForecastResponse>>('/Weather/hourly', {
      params: { Latitude: latitude, Longitude: longitude, Units: units },
    });
    
    const data = response.data.data;
    
    return data;
  },

  getWeeklyForecast: async (latitude: number, longitude: number, units: string) => {
    const response = await apiClient.get<ApiResponse<WeeklyForecastResponse>>('/Weather/forecast', {
      params: { Latitude: latitude, Longitude: longitude, Units: units },
    });
    
    const data = response.data.data;
    
    return data;
  },

  getAstronomy: async (latitude: number, longitude: number, date?: string) => {
    const response = await apiClient.get<ApiResponse<AstronomyResponse>>('/Weather/astronomy', {
      params: { Latitude: latitude, Longitude: longitude, Date: date },
    });
    return response.data.data;
  },

  getAiSummary: async (request: AiSummaryRequest) => {
    const response = await apiClient.post<AiSummaryResponse>('/AiSummary', request);
    return response.data;
  },
};
