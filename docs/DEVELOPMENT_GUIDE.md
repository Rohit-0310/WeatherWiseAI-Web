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
