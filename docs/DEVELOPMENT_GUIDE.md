# Development Guide

## Folder Conventions
We strictly adhere to a **Feature-first architecture**.

```
src/
├── app/                  # Next.js App Router (Routing only)
├── features/             # Business logic domains
│   └── feature-name/
│       ├── components/   # UI for this feature only
│       ├── hooks/        # Feature specific hooks
│       ├── services/     # API calls for this feature
│       ├── store/        # Zustand state for this feature
│       └── types/        # TS interfaces
└── shared/               # Global/shared code
    ├── components/       # shadcn/ui and basic UI elements
    ├── hooks/            # e.g., useTheme
    ├── lib/              # Utility functions
    ├── api/              # Axios configuration
    └── types/            # Global types
```

## How to add pages
1. Navigate to `src/app/`.
2. Create a new folder for the route (e.g., `src/app/settings/`).
3. Create `page.tsx`. Keep this file lean; it should primarily import a composition of Feature components.

## How to add features
1. Identify if the new functionality is an independent domain (e.g., `alerts`).
2. Create a new folder `src/features/alerts`.
3. Scaffold the necessary subfolders (`components`, `hooks`, `services`).
4. Keep the feature encapsulated. Do not import from one feature into another unless absolutely necessary.

## How to add components
- **Shared UI**: If it's a generic button, input, or layout wrapper, place it in `src/shared/components/`.
- **Feature UI**: If it's specific (e.g., `WeatherRadarMap`), place it in `src/features/[feature-name]/components/`.

## How to add hooks
- Follow the same rule as components. Shared hooks go to `src/shared/hooks/`, domain-specific hooks go to the feature folder.

## How to add services
1. Define the TypeScript interfaces for the API response in `features/[feature-name]/types/`.
2. Create Axios call functions in `features/[feature-name]/services/api.ts`.
3. Create TanStack Query hooks in `features/[feature-name]/hooks/` to consume the API functions.

## Naming Conventions
- **Files/Folders**: `kebab-case` (e.g., `weather-card.tsx`, `use-weather.ts`).
- **Components**: `PascalCase` (e.g., `WeatherCard`).
- **Functions/Hooks**: `camelCase` (e.g., `fetchWeatherData`, `useWeather`).
- **Types/Interfaces**: `PascalCase` (e.g., `WeatherData`). Avoid prefixing with `I` or `T`.
