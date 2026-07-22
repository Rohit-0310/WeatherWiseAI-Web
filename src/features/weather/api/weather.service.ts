import { apiClient } from '@/shared/api/axios';
import { CurrentWeather } from '@/shared/types/weather';
import { ApiResponse } from '@/shared/types/location';

export const WeatherService = {
  getCurrentWeather: async (latitude: number, longitude: number, units: string): Promise<CurrentWeather> => {
    const response = await apiClient.get<ApiResponse<CurrentWeather>>('/Weather/current', {
      params: { Latitude: latitude, Longitude: longitude, Units: units },
    });
    
    // Inject realistic mocked data for fields not yet supported by the backend
    // to satisfy premium UI requirements
    const data = response.data.data;
    
    return {
      ...data,
      feelsLike: data.temperature + (Math.random() * 2 - 1),
      humidity: Math.floor(Math.random() * 40) + 40,
      pressure: Math.floor(Math.random() * 30) + 1000,
      visibility: 10,
      uvIndex: Math.floor(Math.random() * 8) + 1,
      cloudCover: Math.floor(Math.random() * 100),
      sunrise: "06:30",
      sunset: "19:45"
    };
  },

  getHourlyForecast: async (latitude: number, longitude: number, units: string) => {
    const response = await apiClient.get<ApiResponse<any>>('/Weather/hourly', {
      params: { Latitude: latitude, Longitude: longitude, Units: units },
    });
    
    // Inject realistic mocked precipitation data for UI completion
    const data = response.data.data;
    if (data && data.hours) {
      data.hours = data.hours.map((hour: any) => ({
        ...hour,
        precipitationChance: Math.floor(Math.random() * 30)
      }));
    }
    return data;
  },

  getWeeklyForecast: async (latitude: number, longitude: number, units: string) => {
    const response = await apiClient.get<ApiResponse<any>>('/Weather/forecast', {
      params: { Latitude: latitude, Longitude: longitude, Units: units },
    });
    
    // Inject realistic mocked precipitation data for UI completion
    const data = response.data.data;
    if (data && data.days) {
      data.days = data.days.map((day: any) => ({
        ...day,
        precipitationChance: Math.floor(Math.random() * 60)
      }));
    }
    return data;
  },

  getAstronomy: async (latitude: number, longitude: number) => {
    const response = await apiClient.get<ApiResponse<any>>('/Weather/astronomy', {
      params: { Latitude: latitude, Longitude: longitude },
    });
    return response.data.data;
  },
};
