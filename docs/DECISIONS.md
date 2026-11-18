# Frontend architecture decisions

| Decision in source | Consequence |
| --- | --- |
| Next.js App Router and React | Shared layouts and metadata, with client-rendered weather views |
| Feature-first domain folders | Location and weather group their UI, hooks and services. Route, layout and shared primitives have separate folders |
| TanStack Query and Axios | Cached GET requests. AI generation is still an imperative request outside the query cache |
| Zustand persistence | Selected location and display preferences survive reloads on the same browser |
| Tailwind, shadcn/ui with Base UI, and next-themes | Shared style tokens, composable controls and class-based themes |
| Framer Motion | Client-side transitions and decorative weather effects |

See [architecture](ARCHITECTURE.md) for the implemented versions and [roadmap](ROADMAP.md) for proposed work.
