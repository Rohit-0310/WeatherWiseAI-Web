# 📖 WeatherWiseAI Web - Project Rules

Version: 1.0

These rules define the frontend engineering standards.

They apply to all developers and AI coding assistants.

---

# 1. General Principles

- Use Feature-first architecture.
- Build reusable components.
- Prioritize accessibility.
- Prefer composition over duplication.
- Keep UI responsive.
- Follow design system consistently.

---

# 2. Folder Rules

Pages belong in App Router.

Business logic belongs in Features.

Reusable UI belongs in Components.

API calls belong in Services.

Never mix responsibilities.

---

# 3. Components

Components should be

- Small
- Reusable
- Typed
- Accessible

Avoid large monolithic components.

---

# 4. State Management

Global state

↓

Zustand

Server state

↓

TanStack Query

Forms

↓

React Hook Form

Validation

↓

Zod

---

# 5. Theme System

Support

Light

Dark

Auto

Auto mode must adapt using

- Local time
- Sunrise
- Sunset
- Weather condition

Never hardcode colors.

Use design tokens.

---

# 6. Animations

Animations must enhance UX.

Avoid unnecessary motion.

Support reduced motion accessibility.

---

# 7. API Calls

Never call backend directly from components.

Always use

Services

↓

React Query

↓

Components

---

# 8. Responsive Design

Mobile First.

Support

Mobile

Tablet

Desktop

Large Desktop

---

# 9. Design System

Use

Tailwind CSS

shadcn/ui

Glassmorphism

Consistent spacing

Consistent typography

---

# 10. Accessibility

Keyboard navigation.

Screen reader support.

Color contrast.

Focus indicators.

ARIA where appropriate.

---

# 11. Naming

Components

WeatherCard.tsx

Hooks

useWeather.ts

Services

weather.service.ts

Stores

theme.store.ts

---

# 12. TypeScript

Avoid any.

Use strict typing.

Prefer interfaces for API models.

---

# 13. Performance

Lazy load where possible.

Optimize images.

Avoid unnecessary re-renders.

---

# 14. Error Handling

Display friendly error messages.

Support loading states.

Support retry.

---

# 15. AI Features

Never generate recommendations on frontend.

All AI responses must come from backend.

Frontend only displays AI output.

---

# 16. Weather Animations

Background must change according to

Sunny

Rain

Snow

Thunderstorm

Fog

Wind

Cloudy

Day

Night

Transitions should be smooth.

---

# 17. Documentation

Every new feature updates

README

ROADMAP

Design docs

---

# 18. Git

Use Conventional Commits.

Feature branches.

Small pull requests.

---

# 19. Testing

Write testable components.

Avoid business logic inside UI.

---

# 20. AI Assistant Rules

AI assistants must

- Follow Feature-first architecture
- Reuse existing components
- Respect design system
- Never duplicate code
- Never bypass services
- Keep components maintainable

These rules are mandatory.