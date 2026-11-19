# WeatherWiseAI Web

WeatherWiseAI Web is a Next.js dashboard for exploring weather, forecasts and on-demand AI recommendations. It uses the separate [WeatherWiseAI API](https://github.com/Rohit-0310/WeatherWiseAI-API).

| Screen | Implemented features |
| --- | --- |
| Dashboard (`/`) | Current conditions, weather metrics, hourly and daily forecasts, solar and lunar cards, condition-based animation |
| AI Summary (`/ai-summary`) | Generate or regenerate a weather summary, clothing recommendation and activity suggestion through the backend |
| Shared navigation | City search, device location lookup, desktop sidebar, mobile bottom navigation, theme toggle and saved settings |

The checked-in stack is Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, shadcn/ui with Base UI, Lucide, Framer Motion, next-themes, Axios, TanStack Query and Zustand. [Architecture](docs/ARCHITECTURE.md)

## Run locally

Use Node.js 24 and npm. Start the companion API with its HTTPS launch profile and trust its development certificate.

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. The default API base is **https://localhost:7008/api/v1** and the API permits this frontend origin in Development.

### Environment configuration

Set `NEXT_PUBLIC_WEATHER_API_URL` at build time to override the API base URL, including /api/v1. Set the corresponding origin in the backend CORS allowlist. Gemini credentials belong exclusively to the backend.

## Build and test

```sh
npm run lint
npm exec -- tsc --noEmit
npm run build
npm start
```

Inter is bundled locally. Run `npm test` for AQI boundary checks. After a production build, install Chromium with `npx playwright install chromium` and run `npm run test:browser` for desktop and mobile browser checks.

Hosting and live-provider verification remain pending. [Deployment](docs/DEPLOYMENT.md)

See the [documentation index](docs/README.md), [contribution guide](CONTRIBUTING.md), and [security policy](SECURITY.md). The project uses the [MIT License](LICENSE).

## Follow a dashboard interaction

The [hourly forecast walkthrough](docs/ARCHITECTURE.md#from-city-selection-to-an-hourly-forecast) traces a city selection from persisted state to the rendered panel. The [AI walkthrough](docs/ARCHITECTURE.md#from-generate-to-three-suggestion-cards) follows a user-triggered POST and its error path. For contributor workflows see the [development guide](docs/DEVELOPMENT_GUIDE.md) and [roadmap](docs/ROADMAP.md).
