Act as a senior frontend engineer, 3D animation engineer, and product designer. Start implementing the AI Suggestions / AI Weather Analyst page in my existing WeatherWiseAI-Web project.

The goal is to let visitors understand today's weather, what to wear, and suitable activities by looking at one realistic moving scene. Put detailed AI explanations below it. Make a brief implementation plan, then proceed with development and verification.

1. Inspect the existing project

Read AGENTS.md, README.md, DEVELOPMENT_GUIDE.md, ARCHITECTURE.md, DESIGN_SYSTEM.md, THEME_SYSTEM.md, ANIMATIONS.md, API_INTEGRATION.md, DECISIONS.md, ROADMAP.md, and CHANGELOG.md where present.

Inspect the current AI page, routing, components, weather/AI response types, theme provider, assets, package.json, and lockfile. Treat source code as authoritative for what is implemented.

The documentation describes Next.js 15 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui, TanStack Query, Axios, Zustand, Framer Motion, and Lucide. Verify actual installed versions before choosing compatible Three.js dependencies. Use the existing package manager and feature-first architecture. Extend the current page and shared weather system.

My single-scene design below supersedes the older card-based layout guidance for this page.

2. Use the installed React Three Fiber skills

Discover and read the available skills from the installed r3f-skills collection. Apply each relevant skill during its implementation stage:

- $r3f-fundamentals: Canvas setup, React integration, lifecycle, rendering ownership.
- $r3f-animation: continuous movement, character clips, action transitions.
- $r3f-loaders: GLB/GLTF loading, caching, cloning, independent characters.
- $r3f-lighting: daylight, overcast light, evening, indoor light, shadows.
- $r3f-materials: believable skin, clothing, buildings, glass, wet surfaces.
- $r3f-textures: texture loading, color spaces, surface detail.
- $r3f-geometry: scene geometry, efficient repeated objects and particles.
- $r3f-shaders: weather effects, vegetation movement, subtle surface effects.
- $r3f-postprocessing: restrained atmospheric finishing when affordable.
- $r3f-interaction: accessible scene interactions if needed.
- $r3f-physics: only where actual collisions or interactive games require simulation.

Report which skills are available and used. If an optional skill is missing, continue with available guidance and official documentation. Do not add every associated dependency just because a skill exists. Retain Framer Motion for DOM transitions and controls; use React Three Fiber for the 3D scene.

3. Build one continuous visual experience

Create a premium, realistic neighborhood scene filling the available page width and most of the initial viewport. Include a street or park, believable buildings, a visible cafe/home interior, trees, sky, and suitable birds or animals.

Keep the same scene geography across weather states. Change its weather, light, clothing, and activities. This is a visual interpretation of the forecast, not a live camera or a claim to show the selected city's actual street.

Rain and snow must occupy the full viewport and remain visible as the AI page scrolls. Integrate with the existing global weather background so effects are not duplicated. Keep precipitation outdoors within the scene; interiors must stay dry.

Use natural proportions, realistic materials, grounded lighting, and restrained glass UI. Avoid cartoon people, emoji scenery, capsule characters, flat SVG figures, excessive neon, and a large empty header.

No separate weather/clothing/activity cards or separate miniature scenes.

Keep location search, navigation, theme controls, and refresh usable. Near the scene, show only concise information: location, condition, temperature with units, and a short recommendation such as “Light rain · Bring an umbrella · Cafe weather.” Derive it from actual data.

Place the detailed report below the scene in one continuous readable section with headings and subtle dividers. Use a quiet background treatment behind text while the surrounding weather atmosphere remains visible.

4. Make people and the environment actually move

Aim for four independently moving people on desktop and two on smaller devices, adapting to measured performance. Use varied phases and paths so people do not move in synchrony.

Use realistic rigged character models with authored or motion-captured animation clips. Implement natural walking, weight shifts, turns, arm motion, and transitions between suitable activities.

Synchronize travel speed with walking clips to avoid sliding feet. Attach an umbrella to the correct hand/bone. Keep grip, canopy position, and clothing consistent with the motion. Use sensible paths without walking through buildings, furniture, or other actors.

Show weather-dependent activities: walking, jogging, playing catch on dry ground, reading indoors, talking at a cafe, or playing a seated board game. Implement only actions supported by available assets.

Animate the environment coherently: cloud drift, wind-driven branches, appropriate bird/animal movement, rain splashes and puddle ripples, and snow drift. Use one shared wind direction. Avoid identical looping movement on every object.

Change outfits and activities through natural action transitions or discreet crossfades/occlusion; do not visibly pop clothes or teleport actors in the foreground.

A stationary photographic background with animated rain does not satisfy the character-movement requirement. Simple geometric people are acceptable only as temporary development placeholders, never as the finished realistic result.

5. Resolve visual assets early

Inventory available models, textures, clothing variants, props, skeletons, and animation clips before building around them. Inspect actual files and clip names; do not invent asset URLs or assume a model contains particular animations.

Use project assets first. If needed and tools permit, obtain freely usable assets from verifiable sources with appropriate licenses. Record source, author, license, and attribution requirements in an asset manifest. Do not make purchases.

The skills provide coding guidance; they do not automatically supply realistic actors. If essential models or clips cannot be obtained, continue the weather logic, page integration, report, and asset-loading infrastructure. Clearly identify temporary placeholders and provide a precise missing-asset list with required formats/actions. Do not claim the photorealistic scene is complete while assets remain missing.

Start by proving one realistic moving character and one working activity inside the environment, then extend to multiple actors and conditions.

6. Drive the whole experience from consistent weather data

Create a typed, testable scene-state resolver using the actual API contract. Normalize condition codes, temperature, feels-like temperature, wind and gusts, precipitation, humidity, visibility, alerts, and local day/night only when those fields are available.

Use feels-like temperature when available, otherwise actual temperature. Normalize units before applying rules. Unknown values must remain unknown.

Derive separate outputs for atmosphere, precipitation, clothing, accessories, activity eligibility, lighting, and wind. Rain and cold must combine rather than compete as mutually exclusive themes.

Use configurable product defaults for clothing bands, with tests around boundaries. These are design heuristics, not medical advice. Honor observed alerts and dangerous conditions ahead of decorative activity choices.

Implement and preview these combinations:

| Conditions | Clothing/accessories | Scene activity |
| --- | --- | --- |
| Mild rain | Light water-resistant layer, umbrella | Umbrella walking; cafe reading or conversation |
| Cold rain | Warm layers, waterproof outerwear, suitable shoes | Brief sheltered walking; indoor activities |
| Hot drizzle | Breathable clothes, lightweight rain protection | Shade/shelter; no heavy winter outfit |
| Dry pleasant weather | Comfortable light clothing | Walking, jogging, gentle outdoor games |
| Strong heat | Light clothing, shade accessories | Resting in shade or indoors; no vigorous midday exercise |
| Cold dry weather | Jacket and warmer layers | Short walks; warm indoor setting |
| Snow | Insulated coat, hat, gloves, boots | Gentle snow activity only when conditions permit; indoor warmth |
| Strong wind | Suitable outer layer; umbrella suppressed when unsuitable | Sheltered routes; stronger tree/cloud movement |
| Thunderstorm/heavy rain | Characters shelter indoors | No outdoor games or exposed umbrella walk |
| Fog/low visibility | Weather-appropriate layers | Reduced visibility and cautious nearby/sheltered activity |

Represent cloudiness, mixed precipitation when supplied, evening, night, and missing data. Use location timezone and sunrise/sunset for scene lighting, not the browser's timezone. Manual light/dark mode controls UI readability without falsifying the selected location's time.

Tie both scene cues and detailed recommendations to the same validated weather snapshot. Constrain AI-selected scene actions to supported, weather-appropriate options. When an AI suggestion cannot be visualized, retain it in the report without pretending it is animated.

7. Preserve and expand detailed AI suggestions

Below the scene, show:
- Weather summary: condition, feels-like temperature, relevant precipitation/wind/humidity/UV when available, timing and practical implications.
- What to wear: specific layers, footwear, accessories, and reasons.
- Activities — good for today: appropriate indoor/outdoor ideas and alternatives.
- Timing or precautions only when supported by forecast data.

Use semantic headings, readable paragraphs, and concise lists inside one report. Include units, selected location, and update time. A short accessible scene description must convey the same main message as the animation.

Reuse existing AI endpoints and TanStack Query/Axios integration. Do not invent backend fields or show demo data as live. If richer structured AI output requires backend work, isolate the adapter and document the required contract while preserving the current endpoint.

Keep provider secrets on the server; never introduce a private AI key into NEXT_PUBLIC variables or client code.

Handle initial loading, stale data, errors, retry, regeneration, and rapid location changes. Keep scene and report associated with the same location and snapshot. Prevent duplicate refresh submissions. Label any non-AI fallback honestly.

8. Implement for performance and accessibility

Keep the route lean and put feature logic/components in the existing feature folder. Separate weather normalization, scene decisions, assets, character control, atmosphere, and report rendering. Avoid one enormous component.

Load heavy 3D code through a suitable client boundary. Keep report content available while assets load or rendering fails. Prefer a single R3F Canvas; avoid multiple uncontrolled render loops and duplicate weather layers.

Use frame updates/refs for continuous movement, independent mixers for independently animated characters, and proper resource cleanup. Adapt resolution, actor count, shadows, particles, textures, and postprocessing to device capability. Load the current scene first.

Provide a visible pause/resume animation control. Respect prefers-reduced-motion, pause expensive work while the document is hidden, and provide an accessible static fallback for unsupported WebGL, context loss, or asset failure.

Decorative layers must not intercept scrolling, clicks, or keyboard focus. Ensure contrast, touch usability, responsive framing, and readable text in light/dark/auto modes. Avoid intense or repeated lightning flashes. Restore render state cleanly after tab resume and route navigation.

9. Implement, inspect, and verify

Proceed in stages without stopping after the plan:
1. Audit source, skills, data, and assets.
2. Build the scene-state resolver and real-data integration.
3. Complete the rainy scene with a naturally moving umbrella character and an indoor activity.
4. Extend clothing, actors, weather combinations, and local time transitions.
5. Complete the detailed report, accessibility, and performance adaptations.
6. Inspect in the browser and fix visual or functional problems.

Add a development-only scenario selector using fixtures for the condition matrix; keep it out of the production user flow.

Test meaningful decisions: cold rain versus warm rain, clothing boundaries, strong-wind umbrella handling, storms suppressing outdoor games, unit conversion, night lighting, missing data, and stale location responses.

Run the repository's relevant type checks, lint, tests, and production build. Inspect desktop and mobile, long reports, pause/reduced motion, asset failure, and switching weather/location. Verify actual movement with a short recording or browser observation over time; screenshots alone do not prove movement.

Report measured performance with device/viewport context. If browser or performance tools are unavailable, state what remains unverified rather than claiming checks passed.

Update relevant animation/architecture documentation and the changelog.

Finish by reporting what was implemented, skills used, verification results, preview instructions, and any exact asset/API blockers. Do not publish or deploy unless I separately request it.
