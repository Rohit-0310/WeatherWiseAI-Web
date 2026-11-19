# WeatherWiseAI Web project rules

- Keep routing in `src/app`, weather and location features under `src/features`, and shared controls and utilities in their existing folders.
- Use TypeScript, Tailwind CSS and the established shadcn/ui primitives. Build responsive, keyboard-accessible UI and verify contrast and motion preferences.
- Keep HTTP calls in services through the shared Axios client. Use TanStack Query for server data and Zustand for persisted client preferences. Keep provider secrets and AI generation on the API side.
- Preserve compatibility with the [backend contract](docs/API_INTEGRATION.md). Account for missing data, units, errors and loading states.
- Treat weather-driven theme changes, offline support and additional animation as proposals until implemented. Follow the [current architecture](docs/ARCHITECTURE.md) for source behavior.
- Follow [coding standards](docs/CODING_STANDARDS.md) and [contribution checks](CONTRIBUTING.md). Use Conventional Commits and update docs and tests for behavior changes.

## Reviewing a frontend change

| Concern | Contributor standard | Where to look |
| --- | --- | --- |
| Components and types | Compose routes from focused feature components. Type props and response models, narrow unknown input and reuse the shared primitives. | Dashboard route, weather cards and components/ui |
| State and API calls | Put request construction in a feature service, cached GETs in hooks, cross-screen preferences in the app store and transient interaction state in the component. | [Architecture](docs/ARCHITECTURE.md) |
| Responsive design | Check the same action using a narrow viewport, tablet and desktop. Ensure fixed navigation leaves space for the last card and focused control. | Shared layout and MobileNav |
| Accessibility | Give icon-only controls an accessible name. Verify keyboard selection, focus after closing a dialog, legible text over weather layers and reduced-motion behavior. | [Design system](docs/DESIGN_SYSTEM.md) |
| Styling and motion | Reuse semantic colors and spacing, keep weather layers behind interactive content, and review animations on a small screen. | [Theme](docs/THEME_SYSTEM.md) and [animations](docs/ANIMATIONS.md) |
| Data and errors | Distinguish a pending request, a successful empty result and a failed request. Keep previous units and cached keys in mind when changing settings. | [Integration guide](docs/API_INTEGRATION.md) |
| Performance | Check re-renders, particle count and layout movement before adding continuous animation. Lazy-load expensive optional UI where measurement warrants it. | WeatherBackground and the dashboard panels |
| AI output | Send the selected weather snapshot to the backend. Expose progress, a retry action and the three result fields. | AI Summary route |

Keep feature branches and pull requests focused. Write testable components with service calls isolated from presentation. Update the roadmap when scope changes, the integration guide for contract changes, and design guidance for new shared patterns. React Hook Form and Zod were named in the original form guidelines. Evaluate their use for a specific form before documenting any runtime validation guarantee.
