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
  aqi: number | null;
  maxTemperature: number;
  minTemperature: number;
  cloudCover?: number;
  precipitationChance: number;
  sunrise?: string;
  sunset?: string;
}

export interface HourlyForecastData {
  time: string;
  temperature: number;
  windSpeed: number;
  condition: WeatherCondition;
  precipitationChance: number;
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

export interface AstronomyResponse {
  dayLength: string;
  sunrise: string;
  sunset: string;
  moonRise: string | null;
  moonSet: string | null;
  moonPhaseName: string;
  moonIllumination: number;
}
export interface AiSummaryRequest {
  location: string;
  temperature: string;
  condition: string;
  humidity: string;
  wind: string;
  uvIndex: string;
}
export interface AiSummaryResponse {
  summary: string;
  clothing: string;
  activity: string;
}
