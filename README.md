# WeatherWiseAI Web

WeatherWiseAI Web is a Next.js dashboard for exploring weather, forecasts and on-demand AI recommendations. It uses the separate [WeatherWiseAI API](https://github.com/Rohit-0310/WeatherWiseAI-API).

| Screen | Implemented features |
| --- | --- |
| Dashboard (`/`) | Current conditions, weather metrics, hourly and daily forecasts, solar and lunar cards, condition-based animation |
| AI Summary (`/ai-summary`) | Generate or regenerate a weather summary, clothing recommendation and activity suggestion through the backend |
| Shared navigation | City search, device location lookup, desktop sidebar, mobile bottom navigation, theme toggle and saved settings |

The checked-in stack is Next.js 16.2.9 App Router, React 19.2.4, TypeScript, Tailwind CSS 4, shadcn/ui with Base UI, Lucide, Framer Motion, next-themes, Axios, TanStack Query and Zustand. [Architecture](docs/ARCHITECTURE.md)

## Run locally

Use Node.js 20.9 or newer as required by Next.js and npm. Start the backend with its HTTPS launch profile and trust its development certificate. The API serves Swagger at `https://localhost:7008/`.

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. The frontend uses **https://localhost:7008/api/v1** directly from the browser. This URL is fixed in `src/shared/api/axios.ts`. The backend permits the exact development origin above. Use `localhost`, as `127.0.0.1` is a different origin.

### Environment configuration

No application environment variable is read for the API client. Setting `NEXT_PUBLIC_WEATHER_API_URL` does not override it. Gemini configuration belongs to the backend only. See [the integration guide](docs/API_INTEGRATION.md).

## Build and test

```sh
npm run lint
npm exec -- tsc --noEmit
npm run build
npm start
```

The build fetches Inter via `next/font/google` and needs font access in the build environment. The repository has no automated test script or suite. Use the [manual verification checklist](docs/DEVELOPMENT_GUIDE.md) and consult the [draft release notes](docs/RELEASE_NOTES_V1.md) for current failures.

For hosted integration, the API URL and backend CORS constraints must be resolved first. [Deployment](docs/DEPLOYMENT.md)

See the [documentation index](docs/README.md), [contribution guide](CONTRIBUTING.md), and [security policy](SECURITY.md). The project uses the [MIT License](LICENSE).

## Follow a dashboard interaction

The [hourly forecast walkthrough](docs/ARCHITECTURE.md#from-city-selection-to-an-hourly-forecast) traces a city selection from persisted state to the rendered panel. The [AI walkthrough](docs/ARCHITECTURE.md#from-generate-to-three-suggestion-cards) follows a user-triggered POST and its error path. For contributor workflows see the [development guide](docs/DEVELOPMENT_GUIDE.md) and [roadmap](docs/ROADMAP.md).
