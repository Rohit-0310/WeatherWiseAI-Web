# Deployment

## Environment Variables
The application requires specific environment variables to function in production.
- `NEXT_PUBLIC_WEATHER_API_URL`: The base URL for the WeatherWiseAI-API.
- `NEXT_PUBLIC_AI_API_KEY`: API key for AI features (must be kept secure; only expose `NEXT_PUBLIC_` variables if they are safe for the client).

Ensure these are configured securely in your deployment platform's dashboard.

## Production Build
To create a production-ready build locally:
```bash
npm run build
```
This generates the optimized application in the `.next` directory. Test it locally using `npm run start`.

## Optimization Strategies
- **Image Optimization**: Use Next.js `<Image />` component for all assets to ensure WebP format, responsive sizing, and lazy loading.
- **Bundle Size**: React Server Components (RSC) drastically reduce client-side JavaScript. Keep heavy libraries server-side where possible.
- **Caching**: Leverage Next.js route caching and TanStack Query data caching to minimize unnecessary API calls.

## Deployment Platforms
WeatherWiseAI-Web is designed for edge-ready platforms that fully support Next.js App Router features.

### Recommended: Vercel
1. Push the repository to GitHub.
2. Import the project in the Vercel Dashboard.
3. Configure Environment Variables in the project settings.
4. Deploy. Vercel automatically configures CI/CD and edge functions for Next.js.
