# Animations

Animations are critical to the AI-first, premium feel of WeatherWiseAI-Web. We primarily use **Framer Motion**.

## Background Animations
These are full-screen, low-z-index components that render based on the current weather state.
- **Rain**: Optimized HTML Canvas or Framer Motion particles falling linearly.
- **Snow**: Drifting, rotating particles with varying opacity and speed.
- **Sun**: Subtle, pulsing light rays.
- **Lightning**: Randomized, brief flash overlays (opacity spikes).
- **Cloud Movement**: Slow, continuous horizontal translation of SVG cloud assets.
- **Wind**: Fast-moving, horizontal particle streaks with CSS blur.

## Page & Layout Transitions
- **Page Transitions**: Smooth fade-ins and slight vertical slides (`y: 20` to `y: 0`, `opacity: 0` to `opacity: 1`) when navigating between routes.
- **Layout Animations**: When weather cards are added, removed, or reordered, use Framer Motion's `<AnimatePresence>` and `layout` props for fluid repositioning.

## Micro Interactions
Applied to individual components to make the UI feel responsive.
- **Hover States**: Cards slightly elevate and glow. Buttons slightly scale down on tap (`scale: 0.95`).
- **Data Loading**: Skeletons use a smooth pulsing animation (`animate-pulse` via Tailwind).
- **Number Counters**: When temperature or metrics update, numbers should transition fluidly (e.g., counting up from 0 to 72).

## Performance Considerations
- Use `transform` and `opacity` exclusively for animations to avoid layout thrashing.
- Respect user preferences: check for `prefers-reduced-motion` and disable heavy particle effects if true.
- Unmount heavy animations when they are out of the viewport.
