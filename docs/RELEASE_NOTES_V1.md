# Draft Web release notes for v1.0.0

**Status: unreleased and not ready for stable release.** Source baseline `5b32876`. This audit updated documentation only.

## Verified in source

- Weather dashboard with current conditions, hourly and daily forecasts, astronomy and condition-based effects.
- City search and device location, mobile and desktop navigation, light/dark styling and persisted preferences.
- On-demand weather summary, clothing recommendation and activity suggestion through the backend.

## Setup and compatibility

Node.js 20.9 or newer, npm, build access to Google Fonts, and the companion server at `https://localhost:7008/api/v1`. The frontend must use `http://localhost:3000` for the current backend CORS policy. Set the Gemini credential on the backend. No breaking changes were introduced by this audit. Before publishing, confirm the previously distributed baseline and document any config or behavior migration.

## Checks and release gates

On Node.js 24.16.0 and npm 11.17.0 using the local installed dependencies:

- `npm run lint` failed with seven errors and four warnings. Errors include explicit any and React hook memoization dependencies.
- TypeScript failed on AI animation variants, hourly forecast types and the default location's missing timezone.
- `npm run build` failed to fetch Inter from Google Fonts in both attempts. The separate TypeScript check also found errors. A successful production bundle was not produced.
- No automated test script or suite exists. Browser integration, live AI and deployment were not verified in this audit.

Fix the build and lint/type checks, make the API base URL and CORS deployable, clarify DTOs and errors, and verify location changes, timezones, units, accessibility and browser integration. Add CI and automated tests before release. [Integration gaps](API_INTEGRATION.md) · [Roadmap](ROADMAP.md)
