# Frontend deployment

Use Node.js 24, npm ci, npm run build and npm start. The build bundles Inter from the installed font package.

Set NEXT_PUBLIC_WEATHER_API_URL at build time. Set Cors__AllowedOrigins__0 on the API to the exact browser origin. Verify HTTPS, CORS and provider failures in the intended environment before publishing.

A managed Next.js host or a Node.js service is a candidate once the build and connectivity gates pass. See [draft release notes](RELEASE_NOTES_V1.md).

## Verifying a candidate build

After a successful production build, start the generated .next output with `npm start`. Open the site in a fresh browser session, inspect the effective API URL, search for a city, then switch units and generate a suggestion. The browser must reach the configured HTTPS API and the API must accept that browser origin. A successful Next.js page response alone cannot establish either condition.

For performance review, inspect the client bundle of interactive routes and measure layout movement as forecasts arrive. For new image-heavy features, evaluate responsive sizing and lazy loading. Azure hosting will be evaluated separately. No platform-specific deployment was verified.
