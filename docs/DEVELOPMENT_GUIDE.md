# Development guide

Use the [local setup](../README.md#run-locally). Keep route composition in `src/app`, domain UI and service calls in `src/features`, cross-feature code in `src/shared`, and reusable controls in `src/components/ui`. Inspect the current backend contract before adding a request or changing a client type. [Coding standards](CODING_STANDARDS.md)

## Verification

Use the checked-in npm lockfile. Run `npm run lint`, `npm exec -- tsc --noEmit` and `npm run build`. See [known failures](RELEASE_NOTES_V1.md). There is no automated test suite. For manual checks, run both projects and exercise:

- Dashboard loading and provider failures, city search and geolocation permission, hourly/daily forecast and astronomy.
- Desktop and mobile navigation, unit changes and persisted settings across reloads.
- Light and dark mode, keyboard focus, contrast and reduced-motion preferences.
- AI generation, error and regeneration with a backend key. Change location during a request and check which location the result describes.
- Browser Network and Console for TLS, CORS and response-shape errors. Use the backend Swagger UI to isolate provider or contract problems.

Check only implemented settings in the visible UI and record what was actually tested. Several settings are stored while display coverage varies by component.

## Adding a route, component or request

1. **Route.** Add a directory under `src/app` with a `page.tsx` entry. Compose the screen from feature components. Place browser interaction behind a client boundary. Check access from both desktop and mobile navigation when adding a destination.
2. **Feature.** Keep location-specific components, hooks and API calls under `src/features/location`; follow the parallel weather layout for forecast changes. Add only the folders the feature needs. Use `src/shared/hooks` for genuinely cross-feature behavior such as debouncing.
3. **Control.** Reuse the button, dialog or other primitive in `src/components/ui`. Put domain-specific cards alongside the other feature components. Shared layout and settings controls live in `src/shared/components`.
4. **Request.** Compare the backend DTO with the TypeScript response. Add the call in the feature's `api` directory, unwrap the correct body in the service, and expose a query hook for cached reads. Use the [hourly walkthrough](ARCHITECTURE.md#from-city-selection-to-an-hourly-forecast) as an example.
5. **Rendering.** Provide a pending state, a successful empty state and an actionable failure state. Render units from the request and preferences consistently. Test changing city and units while the component is mounted.

## Diagnose a blank dashboard

Open Swagger at `https://localhost:7008/` and try the same coordinates as the browser. If Swagger works, inspect the request URL, certificate and Origin in browser developer tools. If the response is 200, check the envelope, selected location, query key and panel's expected fields. If the request fails, inspect the HTTP status before interpreting a persistent skeleton as loading. For AI generation, inspect the POST separately from the current-weather GET it depends on.
