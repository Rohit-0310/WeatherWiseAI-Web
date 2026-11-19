# Frontend roadmap

## Implemented

Weather dashboard, forecast and astronomy panels, city search and device location, responsive navigation, persisted preferences, light/dark styling, weather background effects and the AI Summary screen. See [screens](../README.md#weatherwiseai-web).

## Proposed before v1.0.0

- Verify public hosting and live-provider integration after the deployment architecture is selected.
- Review timezone behavior across daylight-saving transitions, accessibility and animation performance.
- Confirm the private security reporting channel and review release evidence from CI.

PWA/offline support and a 3D weather experience are possible follow-up work. See [draft release notes](RELEASE_NOTES_V1.md).

## Earlier milestones and remaining work

| Milestone | Current position |
| --- | --- |
| Foundation and theming | App Router, state providers, styling tokens and light/dark support exist. Weather-driven Auto mode and golden-hour transitions remain design proposals. |
| Dashboard, search and forecast | Current, hourly and daily panels and city search are integrated. Improving distinct error states and checking unit coverage are open. |
| Motion and AI | Weather layers and three AI result cards are implemented. Counter animations and broader transition polish remain optional. |
| Accessibility and performance | Keyboard and contrast audits, reduced-motion coverage and measurement of LCP, CLS and INP remain to be verified. |
| Delivery | CI, deployment configuration, staging checks and monitoring remain proposals. |
