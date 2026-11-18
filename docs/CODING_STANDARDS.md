# Frontend coding standards

Use TypeScript and App Router conventions. Prefer server components when browser state is unnecessary. Keep new filenames in kebab-case and component types in PascalCase, following the local folder conventions when editing existing files.

Use feature-local services for Axios calls and TanStack Query for cached server state. Use Zustand for shared client preferences and component state for local interactions. Type API payloads from the [backend contract](API_INTEGRATION.md) and account for nullable fields, distinct error shapes and explicit units.

Reuse shadcn/ui controls, Tailwind utilities, CSS tokens and Lucide icons. Support keyboard interaction, readable contrast, responsive layouts and reduced motion when adding effects. Use semantic headings and label controls. Follow [project rules](../PROJECT_RULES.md) and run the [verification checklist](DEVELOPMENT_GUIDE.md).
