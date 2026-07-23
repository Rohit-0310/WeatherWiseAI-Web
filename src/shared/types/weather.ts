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
  // Mocked/extended fields for premium UI until backend fully supports them
  feelsLike?: number;
  humidity?: number;
  pressure?: number;
  visibility?: number;
  uvIndex?: number;
  cloudCover?: number;
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
  precipitationChance?: number; // Mocked
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
