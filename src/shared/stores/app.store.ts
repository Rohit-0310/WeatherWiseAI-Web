import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location } from '../types/location';

export type UnitSystem = 'Metric' | 'Imperial';

export type TemperatureUnit = 'Celsius' | 'Fahrenheit';
export type WindSpeedUnit = 'km/h' | 'm/s' | 'mph' | 'knots';
export type PressureUnit = 'hPa' | 'mmHg' | 'inHg';
export type VisibilityUnit = 'km' | 'mile';
export type DistanceUnit = 'km' | 'mile';
export type PrecipitationUnit = 'mm' | 'inch';
export type TimeFormat = '12h' | '24h';

export interface Preferences {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  pressure: PressureUnit;
  visibility: VisibilityUnit;
  distance: DistanceUnit;
  precipitation: PrecipitationUnit;
  timeFormat: TimeFormat;
}

interface AppState {
  currentLocation: Location | null;
  units: UnitSystem; // Kept for API compatibility, derived from temperature
  preferences: Preferences;
  setCurrentLocation: (location: Location) => void;
  setUnits: (units: UnitSystem) => void;
  setPreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentLocation: {
        id: 1261481,
        name: "New Delhi",
        timezone: "Asia/Kolkata",
        region: "Delhi",
        country: "India",
        latitude: 28.6139,
        longitude: 77.2090
      },
      units: 'Metric',
      preferences: {
        temperature: 'Celsius',
        windSpeed: 'km/h',
        pressure: 'hPa',
        visibility: 'km',
        distance: 'km',
        precipitation: 'mm',
        timeFormat: '12h',
      },
      setCurrentLocation: (location) => set({ currentLocation: location }),
      setUnits: (units) => set({ units }),
      setPreference: (key, value) => set((state) => {
        const newPreferences = { ...state.preferences, [key]: value };
        // Automatically sync the legacy 'units' for API compatibility when temperature changes
        let newUnits = state.units;
        if (key === 'temperature') {
          newUnits = value === 'Celsius' ? 'Metric' : 'Imperial';
        }
        return { preferences: newPreferences, units: newUnits };
      }),
    }),
    {
      name: 'weatherwise-settings',
    }
  )
);
