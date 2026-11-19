# Frontend deployment

A Next.js production artifact is built with `npm ci` and `npm run build` and served with `npm start`. Use Node.js 20.9 or newer and give the build access to Google Fonts for Inter. No hosted environment or deployment workflow is verified by this repository.

The current browser client targets `https://localhost:7008/api/v1`. In a hosted frontend, that address would resolve on the visitor's device. An environment variable cannot change it in this revision. An agreed frontend base URL and matching API CORS policy are required before public deployment. Verify HTTPS, browser access, forecast and AI error paths and caching on the deployed origin. Keep Gemini credentials on the backend. [Integration constraints](API_INTEGRATION.md)

A managed Next.js host or a Node.js service is a candidate once the build and connectivity gates pass. See [draft release notes](RELEASE_NOTES_V1.md).

## Verifying a candidate build

After a successful production build, start the generated .next output with `npm start`. Open the site in a fresh browser session, inspect the effective API URL, search for a city, then switch units and generate a suggestion. The browser must reach the configured HTTPS API and the API must accept that browser origin. A successful Next.js page response alone cannot establish either condition.

For performance review, inspect the client bundle of interactive routes and measure layout movement as forecasts arrive. For new image-heavy features, evaluate responsive sizing and lazy loading. Vercel or a Node.js host can be evaluated after connectivity and build checks pass. No platform-specific deployment was verified.
