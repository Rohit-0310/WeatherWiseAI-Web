# Frontend roadmap

## Implemented

Weather dashboard, forecast and astronomy panels, city search and device location, responsive navigation, persisted preferences, light/dark styling, weather background effects and the AI Summary screen. See [screens](../README.md#weatherwiseai-web).

## Proposed before v1.0.0

- Resolve TypeScript and ESLint errors and make the font-dependent build reproducible.
- Agree on hosted API URL and CORS configuration, align client DTOs with API contracts and handle errors separately from loading.
- Add contract and browser tests. Verify units, location switching, timezones, keyboard use, contrast and reduced motion.
- Add CI and verify deployment using both apps together.

PWA/offline support and a 3D weather experience are possible follow-up work. See [draft release notes](RELEASE_NOTES_V1.md).
