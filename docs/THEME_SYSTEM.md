# Theme System

WeatherWiseAI-Web features an advanced, multi-dimensional theming system.

## Modes
1. **Light Mode**: High-contrast, clean UI for daylight conditions.
2. **Dark Mode**: Sleek, low-light UI for night or user preference.
3. **Auto Mode**: The default and most complex mode. It adapts intelligently to external factors.

## Theme Adaptation Factors (Auto Mode)

### 1. Weather Adaptation
The UI deeply integrates with the current weather condition of the selected location:
- **Sunny**: Warm, vibrant gradients, bright glass panels.
- **Cloudy**: Muted grays, soft diffused backgrounds.
- **Rain**: Cool blues and slate grays, higher contrast glass to remain legible over rain animations.
- **Thunderstorm**: Dark purples and blacks with stark white accents.
- **Snow**: Icy whites and pale blues.
- **Fog**: Very low contrast, hazy grays with blurred glassmorphism.
- **Wind**: Dynamic, shifting gradients.

### 2. Time Adaptation
The color palette shifts based on the time of day at the target location.
- **Morning**: Soft, warm tones.
- **Noon**: Bright, clear colors.
- **Evening**: Deeper, richer tones.
- **Night**: Dark mode defaults.

### 3. Sunrise & Sunset
Special transitional themes trigger during golden hours. UI accents shift to orange/pink/purple gradients during calculated sunrise and sunset times for the specific latitude/longitude.

## Implementation Details
- Managed globally via **Zustand** (to store current mode and active condition).
- Powered by **CSS Variables** defined in `index.css` or injected dynamically at the `:root` level.
- Tailwind CSS consumes these variables (e.g., `bg-primary` maps to `var(--color-primary)` which changes based on the theme state).
- **Dynamic Backgrounds**: Uses a combination of CSS gradients and Framer Motion elements layered behind the application.
