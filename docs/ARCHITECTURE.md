# Frontend architecture

Next.js App Router renders the shared root layout, Inter font and metadata. Both `/` and `/ai-summary` are client components that call the backend after the app loads. There are no Next.js API routes or API proxy. The root sets the application title, description and language and ships a favicon. No PWA manifest, service worker or offline support is implemented.

| Directory | Responsibility |
| --- | --- |
| `src/app` | Routes, root layout, providers and global styles |
| `src/features/location` | Search, geolocation UI and location service/hooks |
| `src/features/weather` | Dashboard components, forecast/astronomy/current hooks, API service and weather effects |
| `src/components/ui` | shadcn/ui primitives using Base UI where applicable |
| `src/shared` | Layout, settings, Axios client, store, types, hooks and unit formatting |
| `src/lib` | Shared class name utility |

Browser interaction updates component state or Zustand. Zustand persists selected location and preferences in local storage. TanStack Query manages weather and location query state. Hooks call feature services through the shared Axios client. WeatherWiseAI API supplies weather, location and astronomy and calls upstream providers. The AI Summary page uses local state and an imperative POST through WeatherService. The browser never calls Gemini directly.

Responsive layout uses a desktop sidebar and a mobile bottom navigation. Tailwind and CSS tokens define UI styles, next-themes owns light/dark/system preference, and Framer Motion drives page and weather effects. [API integration](API_INTEGRATION.md) · [Theme system](THEME_SYSTEM.md)

## From city selection to an hourly forecast

1. [LocationSearch](../src/features/location/components/LocationSearch.tsx) accepts a search result or a reverse-geocoded device location and calls setCurrentLocation. [The app store](../src/shared/stores/app.store.ts) persists the selection and display preferences under `weatherwise-settings`.
2. [useHourlyForecast](../src/features/weather/hooks/use-forecast.ts) reads location and units and enables the query when a location exists. Its key is `['weather', 'hourly', latitude, longitude, units]`. Switching cities or unit systems selects a separate cached result. Changing the temperature preference also updates the API unit system.
3. [WeatherService](../src/features/weather/api/weather.service.ts) passes Latitude, Longitude and Units to the shared Axios client and returns the envelope's data. [HourlyForecast](../src/features/weather/components/HourlyForecast.tsx) reads the hours and timezone for display. For stale times and retries see [API integration](API_INTEGRATION.md).

## From Generate to three suggestion cards

The [AI Summary page](../src/app/ai-summary/page.tsx) reads the current location and the current-weather query. Generate requires both. The handler clears the previous result and error, sets its busy flag, and constructs a six-string request from that snapshot. WeatherService posts it and returns the response body directly. On success the page renders summary, clothing and activity. On failure it sets a generic retry message. The handler clears the busy flag in either case. Regeneration starts another request. A location switch during generation deserves a manual check because the result lives in page state independently of the weather query key.
