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
      currentLocation: null,
      units: 'Metric',
      setCurrentLocation: (location) => set({ currentLocation: location }),
      setUnits: (units) => set({ units }),
    }),
    {
      name: 'weatherwise-settings',
    }
  )
);
