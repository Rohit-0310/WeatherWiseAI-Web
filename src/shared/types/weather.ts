export interface WeatherCondition {
  code: string;
  description: string;
  providerCode?: number;
}

export interface CurrentWeather {
  latitude: number;
  longitude: number;
  temperature: number;
  windSpeed: number;
  condition: WeatherCondition;
  units: string;
  feelsLike: number;
  humidity: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  windDirection: number;
  isDay: number;
  aqi: number;
  maxTemperature: number;
  minTemperature: number;
  cloudCover: number;
  precipitationChance: number;
  sunrise?: string;
  sunset?: string;
}

export interface HourlyForecastData {
  time: string;
  temperature: number;
  windSpeed: number;
  condition: WeatherCondition;
  precipitationChance?: number; // Mocked
}

export interface WeeklyForecastData {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  maxWindSpeed: number;
  condition: WeatherCondition;
  precipitationChance: number;
}

export interface HourlyForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  units: string;
  hours: HourlyForecastData[];
}

export interface WeeklyForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  units: string;
  days: WeeklyForecastData[];
}
