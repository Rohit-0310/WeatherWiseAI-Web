# Frontend documentation audit

The source baseline is 5b32876 and the audit commit is 798eb4f. The following inventory maps substantive pre-audit sections to their current guides.

| Earlier sections | Disposition and current home |
| --- | --- |
| README overview, features, stack, folders, quick start, variables, scripts and index | README retains the setup and links. Architecture owns the directory table. The fixed Axios URL replaces the earlier public environment-variable example. |
| AGENTS folder responsibilities, coding, naming, component/state/theme/motion/API rules, always/never guidance | Restored feature workflow in AGENTS and style and typing guidance in Coding Standards. Corrected the Next.js version and UI primitive path. |
| Project Rules 1–4, 7, 11–12 | Project Rules and Development Guide cover feature boundaries, typed components, services, hooks and filenames. Architecture covers state ownership and the AI exception to the GET query workflow. Form-library guidance is qualified. |
| Project Rules 5–6, 8–10, 13–16 | Theme System, Animations and Project Rules cover display modes, mobile layout, accessible controls, performance, error rendering and server-generated AI. Weather-driven Auto remains proposed. |
| Project Rules 17–20 | Project Rules, Contributing and AGENTS retain Git, documentation, testability and assistant guidance. |
| Architecture folders, routing, state, data flow, theming, HTTP and reusable components | Architecture includes directory ownership and two worked traces. Feature APIs live in api folders, UI primitives in components/ui. |
| Development Guide pages, features, components, hooks, services, naming | Restored as a feature-extension workflow. Shared code locations are corrected against source. |
| API Integration tools, client/services/hooks, caching, errors, retries, loading | Integration guide gives actual keys and freshness policy, Axios behavior, wire examples and UI gaps. Global error toasts, status-specific retries and a configured 15-minute cache lifetime lack supporting implementation. |
| Design System typography, spacing, glass surfaces, controls, icons, breakpoints, accessibility | Retained as design guidance, with actual font loading identified. Theme System explains mode ownership, weather effects and earlier time-of-day and sunrise/sunset proposals. |
| Animations background, route and layout transitions, micro-interactions, performance | Animations documents the live layer order and AI transition, with counters, offscreen pausing and broader transitions qualified as design options. |
| Decisions on Next, Tailwind, Query, Zustand, Framer Motion, shadcn/ui and feature-first organization | Decisions restores rationale using a preference change as an example. Earlier framework-major and Radix descriptions were outdated. |
| Deployment variables, build, optimization and hosting | Deployment retains the build/start workflow, browser acceptance checks and candidate platforms. Public credentials, unimplemented URL overrides and assumed hosting are omitted. |
| Roadmap phases 1–8, historical changelog, documentation index | Roadmap groups original milestones by delivered and outstanding work. Changelog preserves initial versions as history. Index links to current guides. |
| Mobile plan goals, review request, navigation, layout, explicit units and verification | Original proposal retained in the [historical plan](../mobile_responsiveness_and_units_plan.md). Use Development Guide for current checks. |

The [API integration guide](API_INTEGRATION.md) records cross-repository gaps and [draft release notes](RELEASE_NOTES_V1.md) track build and verification status.
