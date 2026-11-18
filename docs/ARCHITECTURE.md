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
