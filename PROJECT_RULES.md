# WeatherWiseAI Web project rules

- Keep routing in `src/app`, weather and location features under `src/features`, and shared controls and utilities in their existing folders.
- Use TypeScript, Tailwind CSS and the established shadcn/ui primitives. Build responsive, keyboard-accessible UI and verify contrast and motion preferences.
- Keep HTTP calls in services through the shared Axios client. Use TanStack Query for server data and Zustand for persisted client preferences. Keep provider secrets and AI generation on the API side.
- Preserve compatibility with the [backend contract](docs/API_INTEGRATION.md). Account for missing data, units, errors and loading states.
- Treat weather-driven theme changes, offline support and additional animation as proposals until implemented. Follow the [current architecture](docs/ARCHITECTURE.md) for source behavior.
- Follow [coding standards](docs/CODING_STANDARDS.md) and [contribution checks](CONTRIBUTING.md). Use Conventional Commits and update docs and tests for behavior changes.
