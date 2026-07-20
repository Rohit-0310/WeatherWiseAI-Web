# AI Coding Assistant Guidelines

**Target Audience:** ChatGPT, Codex, Claude Code, Cursor, Antigravity CLI, Gemini CLI, GitHub Copilot.

When assisting with this repository, strictly adhere to the following rules to ensure the codebase remains maintainable, scalable, and visually stunning.

## Architecture & Folder Responsibilities
- **Strict Feature-first architecture**. Code must be organized by domain in `src/features/`.
- Do not dump files into a global `components` or `hooks` folder unless they are genuinely shared across multiple features (place in `src/shared/`).
- Routing is handled exclusively in `src/app/` (Next.js 15 App Router).

## Coding Conventions
- **TypeScript Only**: All new files must be `.ts` or `.tsx`. Use strict typing. Avoid `any`.
- **Server vs Client**: Default to React Server Components (RSC). Add `"use client"` ONLY when interactivity (hooks, state, Framer Motion) is required.
- **Breaking Changes**: This project uses Next.js 15. The App Router APIs, conventions, and file structures differ from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Naming Conventions
- **Files/Directories**: `kebab-case` (e.g., `weather-card.tsx`).
- **React Components**: `PascalCase` (e.g., `WeatherCard`).
- **Functions/Variables**: `camelCase` (e.g., `fetchWeather`).
- **Types/Interfaces**: `PascalCase` (e.g., `WeatherData`). No `I` or `T` prefixes.

## Component Rules
- Use **Tailwind CSS v4** for all styling.
- Use **shadcn/ui** primitives found in `src/shared/components/ui/`.
- Keep components small and focused. Extract logic into custom hooks.

## State Management Rules
- Use **TanStack Query** for all async data fetching and server state.
- Use **Zustand** only for global client state (e.g., UI preferences).
- Use `useState` for local component state.

## Theme & Design Principles
- **Aesthetics Matter**: The app must look premium. Implement Glassmorphism where applicable using `backdrop-blur` and semi-transparent backgrounds.
- Never hardcode colors like `text-black` or `bg-white` if it breaks the theme. Always use theme CSS variables or Tailwind's semantic colors configured for the Theme System.
- Support Dark mode, Light mode, and Auto mode (weather/time based).

## Animation Rules
- Use **Framer Motion** for animations.
- Include micro-interactions (hover, tap) on interactive elements.
- Implement conditional background animations for weather states gracefully, ensuring performance.

## API Integration Rules
- Use **Axios** for HTTP requests.
- Handle loading and error states explicitly using TanStack Query's provided booleans (`isLoading`, `isError`).

## Things AI Assistants Should ALWAYS Do
- Read existing documentation in `docs/` before making architectural changes.
- Ensure responsive design (`sm`, `md`, `lg`, `xl` breakpoints).
- Write clean, self-documenting code with comments only where logic is complex.

## Things AI Assistants Should NEVER Do
- Never mix feature domains.
- Never use outdated Next.js Pages router conventions (`pages/`).
- Never introduce new styling libraries (stick to Tailwind).
- Never ignore accessibility (ARIA, focus states, contrast).
