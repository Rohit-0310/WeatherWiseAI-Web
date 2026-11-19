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

## Applying these choices

The root layout supplies shared providers and metadata while interactive routes consume browser state. Feature-first folders keep the city search, its debounce behavior and its lookup service together. Shared primitives stay reusable across weather, location and settings screens.

TanStack Query owns request identity and freshness. Zustand persists preferences across reloads. For example, selecting Fahrenheit changes the stored preference and API unit system, which selects a separate forecast query. Persisting a second copy of the hourly payload in the store would require synchronizing it on every refetch.

Tailwind utilities and semantic tokens let a checked-in shadcn/ui primitive share styles across screens. Framer Motion handles transitions where a component enters or leaves. These choices leave keyboard behavior, contrast over changing backgrounds and animation cost to be verified in the composed screen.
