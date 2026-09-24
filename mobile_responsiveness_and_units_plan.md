## Goal Description
The current UI hides critical navigation and settings elements on mobile devices (Sidebar and Theme Toggle). Furthermore, the bottom weather cards (Hourly and Weekly forecasts) do not explicitly display the selected temperature unit (e.g., °C or °F), leading to confusion when the user changes preferences. This plan aims to introduce a mobile-friendly bottom navigation bar and update all temperature displays to explicitly show the selected unit.

## User Review Required
- **Mobile Navigation Design**: I propose adding a sleek, floating bottom navigation bar exclusively for mobile devices. This bar will house the Home, AI Summary, Settings, and Theme Toggle buttons, ensuring they are always accessible on smaller screens without cluttering the TopNav. Do you agree with this design?

## Proposed Changes

### 1. Mobile Bottom Navigation
- **[NEW] src/shared/components/layout/MobileNav.tsx**: Create a fixed bottom navigation bar visible only on small screens (\lex lg:hidden\). It will contain:
  - Home Link
  - AI Summary Link
  - Theme Toggle Button
  - Settings Button (to open the \SettingsModal\)

### 2. Layout Integration
- **[MODIFY] src/app/layout.tsx**: Integrate the new \MobileNav\ component so it renders globally alongside the existing \Sidebar\.
- **[MODIFY] src/shared/components/layout/TopNav.tsx**: Ensure the layout remains clean. The Theme Toggle will remain hidden on mobile in the TopNav since it will now be in the MobileNav.

### 3. Explicit Temperature Units
- **[MODIFY] src/features/weather/components/HourlyForecast.tsx**: 
  - Read \preferences.temperature\ from \useAppStore\.
  - Update all temperature displays (e.g., \Math.round(temperature)°\) to append \C\ or \F\ dynamically (e.g., \24°C\).
- **[MODIFY] src/features/weather/components/WeeklyForecast.tsx**: 
  - Read \preferences.temperature\ from \useAppStore\.
  - Update min and max temperature displays to append the explicit unit letter.

## Verification Plan
### Automated Tests
- Run \
pm run lint\ to ensure no syntax or React purity errors are introduced.

### Manual Verification
1. Open the app in a mobile viewport simulator.
2. Verify that a bottom navigation bar appears, providing access to Home, AI Summary, Settings, and Theme Toggle.
3. Open the Settings modal and change the temperature unit.
4. Verify that the bottom cards (Hourly and Weekly) explicitly display the new unit letter (e.g., °C -> °F) alongside the updated numeric values.
