import { Preferences, UnitSystem } from '../stores/app.store';

export const formatTemperature = (value: number) => {
  return `${Math.round(value)}°`; // The API handles C/F conversion via units
};

export const formatWindSpeed = (value: number, apiUnits: UnitSystem, prefs: Preferences) => {
  const kmh = apiUnits === 'Imperial' ? value * 1.60934 : value;
  
  if (prefs.windSpeed === 'm/s') return `${(kmh / 3.6).toFixed(1)} m/s`;
  if (prefs.windSpeed === 'mph') return `${(kmh * 0.621371).toFixed(1)} mph`;
  if (prefs.windSpeed === 'knots') return `${(kmh * 0.539957).toFixed(1)} knots`;
  return `${Math.round(kmh)} km/h`;
};

export const formatVisibility = (meters: number, prefs: Preferences) => {
  const km = meters / 1000;
  if (prefs.visibility === 'mile') return `${(km * 0.621371).toFixed(1)} mi`;
  return `${km.toFixed(1)} km`;
};

export const formatPressure = (hpa: number, prefs: Preferences) => {
  if (prefs.pressure === 'mmHg') return `${(hpa * 0.750062).toFixed(1)} mmHg`;
  if (prefs.pressure === 'inHg') return `${(hpa * 0.02953).toFixed(2)} inHg`;
  return `${Math.round(hpa)} hPa`;
};

export const formatPrecipitation = (mm: number, prefs: Preferences) => {
  if (prefs.precipitation === 'inch') return `${(mm * 0.0393701).toFixed(2)} in`;
  return `${mm.toFixed(1)} mm`;
};
