# Frontend roadmap

## Implemented

Weather dashboard, forecast and astronomy panels, city search and device location, responsive navigation, persisted preferences, light/dark styling, weather background effects and the AI Summary screen. See [screens](../README.md#weatherwiseai-web).

## Proposed before v1.0.0

- Resolve TypeScript and ESLint errors and make the font-dependent build reproducible.
- Agree on hosted API URL and CORS configuration, align client DTOs with API contracts and handle errors separately from loading.
- Add contract and browser tests. Verify units, location switching, timezones, keyboard use, contrast and reduced motion.
- Add CI and verify deployment using both apps together.

PWA/offline support and a 3D weather experience are possible follow-up work. See [draft release notes](RELEASE_NOTES_V1.md).

## Earlier milestones and remaining work

| Milestone | Current position |
| --- | --- |
| Foundation and theming | App Router, state providers, styling tokens and light/dark support exist. Weather-driven Auto mode and golden-hour transitions remain design proposals. |
| Dashboard, search and forecast | Current, hourly and daily panels and city search are integrated. Improving distinct error states and checking unit coverage are open. |
| Motion and AI | Weather layers and three AI result cards are implemented. Counter animations and broader transition polish remain optional. |
| Accessibility and performance | Keyboard and contrast audits, reduced-motion coverage and measurement of LCP, CLS and INP remain to be verified. |
| Delivery | CI, deployment configuration, staging checks and monitoring remain proposals. |
