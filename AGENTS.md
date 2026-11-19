# Assistant guidance

Follow [project rules](PROJECT_RULES.md) and [coding standards](docs/CODING_STANDARDS.md). Inspect the installed Next.js version and local package documentation for framework changes. Current implementation and folder ownership are in [architecture](docs/ARCHITECTURE.md). Verify API paths and payloads against the [integration guide](docs/API_INTEGRATION.md) and provider calls in source. Keep browser-visible configuration free of secrets.

## Working on a feature

1. Read the route and its feature hook, service and response type together. Locate shared primitives in `src/components/ui`. Check the installed Next.js documentation before changing an App Router convention.
2. Use a client component for browser APIs, hooks and interactive effects. Keep generic controls independent of weather or location state. Match adjacent filenames and name React components in PascalCase.
3. For a cached GET, include every request parameter that changes the result in the query key. For AI changes, inspect the imperative generation handler and its local state as well as the backend response.
4. Exercise loading, failure, keyboard navigation, mobile navigation and both themes. Update the relevant guide and report the lint, type-check and build results.
