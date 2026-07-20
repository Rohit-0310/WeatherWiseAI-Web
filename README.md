# WeatherWiseAI-Web

## Project Overview
WeatherWiseAI-Web is an AI-first weather application designed with a feature-first architecture. It provides an intuitive, responsive, and dynamic user interface that adapts to the current weather conditions, time of day, sunrise, and sunset, offering a premium and highly interactive experience.

## Features
- **AI-first Weather Insights**: Leverages WeatherWiseAI-API to deliver smart weather forecasts and insights.
- **Dynamic Theming System**:
  - Light and Dark modes.
  - Auto mode adapting to weather condition, time of day, sunrise, and sunset.
  - Custom themes for conditions: Sunny, Cloudy, Rain, Thunderstorm, Snow, Fog, Wind.
- **Advanced Animations**: Weather-specific micro-interactions and background effects (e.g., rain, snow, lightning, cloud movement) using Framer Motion.
- **Feature-first Architecture**: Scalable and maintainable codebase organization.

## Technology Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching & Caching**: [TanStack Query](https://tanstack.com/query/latest) & Axios
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms & Validation**: React Hook Form & Zod
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

## Folder Structure
```
.
├── docs/                 # Extensive project documentation
├── public/               # Static assets
└── src/
    ├── app/              # Next.js App Router (Pages & Layouts)
    ├── features/         # Feature-first modules (Components, Hooks, Store, etc.)
    └── shared/           # Shared components, utilities, and assets
```

## Quick Start
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd weatherwise-web
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open the app:** Visit `http://localhost:3000`

## Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
```env
NEXT_PUBLIC_WEATHER_API_URL=your_api_url_here
NEXT_PUBLIC_AI_API_KEY=your_ai_api_key_here
```

## Project Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built app in production mode.
- `npm run lint`: Runs ESLint to catch code issues.

## Documentation Index
Comprehensive guides are located in the [`docs/`](./docs) folder:
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Development Guide](./docs/DEVELOPMENT_GUIDE.md)
- [Design System](./docs/DESIGN_SYSTEM.md)
- [Theme System](./docs/THEME_SYSTEM.md)
- [Animations](./docs/ANIMATIONS.md)
- [API Integration](./docs/API_INTEGRATION.md)
- [Decisions & Rationales](./docs/DECISIONS.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [Roadmap](./docs/ROADMAP.md)
- [Changelog](./docs/CHANGELOG.md)
