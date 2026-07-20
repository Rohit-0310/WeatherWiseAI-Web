# API Integration

## Tools
- **Axios**: HTTP client for creating the base API instance, handling interceptors, and making requests.
- **TanStack Query (React Query)**: State management for server data (caching, loading states, background updates).

## API Layer Architecture
1. **Base Instance (`src/shared/api/axios.ts`)**:
   - Configures the base URL (`process.env.NEXT_PUBLIC_WEATHER_API_URL`).
   - Sets up default headers.
   - Includes interceptors for logging, error normalization, and potentially auth tokens.

2. **Feature Services (`src/features/[feature]/services/`)**:
   - Contains pure async functions that call the Axios instance.
   - e.g., `export const getWeather = async (city: string) => api.get('/weather', { params: { city } });`

3. **Feature Hooks (`src/features/[feature]/hooks/`)**:
   - Wraps the service functions in `useQuery` or `useMutation`.
   - Manages query keys centrally.

## Caching Strategy
- Weather data changes relatively frequently, but not every second.
- **Stale Time**: Default to 5 minutes (`300000ms`).
- **Cache Time**: Default to 15 minutes.
- Implemented via global query client defaults in `src/app/providers.tsx`.

## Error Handling
- Axios interceptors catch global errors (e.g., 500s) and dispatch toast notifications.
- Component-level errors are handled by checking `isError` and `error` properties from TanStack Query hooks, rendering fallback UIs or retry buttons.

## Retry Strategy
- Default TanStack Query behavior: Retry failed requests 3 times with exponential backoff.
- Disable retries for 404 (City Not Found) or 401/403 errors.

## Loading States
- Utilize `isLoading` (initial fetch) and `isFetching` (background refetch) from TanStack Query.
- Render Skeleton components (from shadcn/ui) during initial loading to prevent layout shift.
