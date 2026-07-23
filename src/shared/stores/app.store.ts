import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location } from '../types/location';

export type UnitSystem = 'Metric' | 'Imperial';

interface AppState {
  currentLocation: Location | null;
  units: UnitSystem;
  setCurrentLocation: (location: Location) => void;
  setUnits: (units: UnitSystem) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentLocation: {
        id: 1261481,
        name: "New Delhi",
        region: "Delhi",
        country: "India",
        latitude: 28.6139,
        longitude: 77.2090
      },
      units: 'Metric',
      setCurrentLocation: (location) => set({ currentLocation: location }),
      setUnits: (units) => set({ units }),
    }),
    {
      name: 'weatherwise-settings',
    }
  )
);
