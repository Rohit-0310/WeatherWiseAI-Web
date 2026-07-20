# Architecture

## Feature-first Architecture
WeatherWiseAI-Web uses a **Feature-first architecture** (also known as feature-driven or modular architecture). Instead of organizing files by type (e.g., all components together, all hooks together), the codebase is organized by business feature. This ensures high cohesion, loose coupling, and scalability.

## Folder Responsibilities
- `src/app/`: Next.js 15 App Router routing structure (pages, layouts, and loading states).
- `src/features/`: Contains domain-specific modules (e.g., `dashboard`, `search`, `forecast`). Each feature contains its own:
  - `components/`: Feature-specific UI components.
  - `hooks/`: Custom React hooks related to the feature.
  - `store/`: Zustand state slices or context providers.
  - `services/`: API calls and data fetching logic (Axios + TanStack Query).
  - `types/`: TypeScript definitions for the feature.
- `src/shared/`: Global resources used across multiple features.
  - `components/`: Generic UI elements (shadcn/ui, buttons, inputs).
  - `hooks/`: Global hooks (e.g., `useTheme`, `useDebounce`).
  - `lib/`: Utility functions (e.g., Tailwind merge, formatting).
  - `api/`: Base Axios instance and global API configurations.

## State Management
- **Server State**: Managed by **TanStack Query**. It handles data fetching, caching, synchronization, background updates, and loading/error states from the WeatherWiseAI-API.
- **Client/Global State**: Managed by **Zustand**. Used sparingly for purely client-side global state like user preferences, UI toggles, and current active theme overrides.
- **Local State**: Managed by React's built-in `useState` and `useReducer` for component-specific state.

## Data Flow
1. **User Action**: User interacts with the UI (e.g., searches for a city).
2. **Component**: Dispatches a TanStack Query hook (e.g., `useWeatherSearch`).
3. **Service Layer**: The hook utilizes Axios to make an HTTP request to the WeatherWiseAI-API.
4. **Cache & Store**: TanStack Query caches the response. If global UI state needs updating (like recent searches), Zustand is updated.
5. **UI Update**: React re-renders the component with the newly fetched data, triggering Framer Motion animations if applicable.

## Routing
Routing is handled exclusively by the Next.js 15 **App Router** (`src/app/`). We utilize React Server Components (RSC) where possible for performance, rendering client components only when interactivity (hooks, state, Framer Motion) is required.

## Theme Architecture
Theming goes beyond simple light/dark modes. The architecture includes a **Theme Provider** that listens to:
1. System preferences.
2. Current local time (for sunrise/sunset calculations).
3. Current weather conditions (Sunny, Cloudy, Rain, etc.).
It dynamically applies Tailwind CSS variables to the root, altering the entire color palette, backgrounds, and specific component styles.

## API Communication
The API layer acts as an abstraction over `Axios`.
- Centralized Axios instance with interceptors for auth and error handling.
- TanStack query functions import these Axios services to manage server state efficiently.

## Reusable Components
Built using **Tailwind CSS v4** and **shadcn/ui**. They are highly customizable, accessible (Radix UI primitives under the hood), and isolated in `src/shared/components/ui/`.
