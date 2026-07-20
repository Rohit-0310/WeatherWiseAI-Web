# Architecture & Tech Stack Decisions

## Why Next.js 15?
Next.js provides a robust, production-ready framework for React. Version 15 with the App Router offers superior performance through React Server Components (RSC), seamless API routes (if needed), optimized image loading, and excellent SEO capabilities required for a modern web application.

## Why Tailwind CSS v4?
Tailwind CSS accelerates UI development through utility classes. Version 4 brings performance improvements and native CSS variables support. It perfectly aligns with our goal of creating a highly custom, dynamic theming system without writing sprawling, unmaintainable CSS files.

## Why TanStack Query?
Handling server state (caching, deduping, background updates, loading/error states) is complex. TanStack Query standardizes data fetching, drastically reducing boilerplate code compared to using `useEffect` and Redux/Zustand for server data. It integrates perfectly with Axios.

## Why Zustand?
For client-side global state (e.g., UI preferences, current active weather theme), Zustand is chosen over Redux or Context API because it is lightweight, requires minimal boilerplate, avoids unnecessary re-renders, and is highly performant.

## Why Framer Motion?
Weather applications thrive on feeling alive. Framer Motion is the industry standard for React animations. It handles complex physics-based micro-interactions, layout animations, and heavy background effects (like rain or snow) gracefully with its declarative syntax.

## Why shadcn/ui?
shadcn/ui provides beautifully designed, accessible (Radix UI) components that we *own* (copy-pasted into the codebase). This allows us to heavily customize them to match our glassmorphism and dynamic weather aesthetics, which is harder to achieve with rigid component libraries like Material UI or Ant Design.

## Why Feature-first architecture?
In standard layered architectures (all components together, all hooks together), navigating a growing codebase becomes difficult. A feature-first approach groups related code together (e.g., everything related to "Search" lives in `src/features/search`). This improves maintainability, team collaboration, and code discoverability.
