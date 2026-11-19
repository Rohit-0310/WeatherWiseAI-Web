# Animations

The dashboard mounts WeatherBackground behind the content. Framer Motion and CSS render clear sky, cloud, rain/snow, fog, wind and thunderstorm effects according to available weather data. Rain and snow use DOM particles. The AI Summary page uses its own DOM transitions for generation and result cards.

Prefer transform and opacity for new effects. Use non-blocking decorative layers and verify reduced motion and contrast, especially for precipitation and lightning. Comprehensive reduced-motion handling and performance measurements are open work. No 3D weather scene is part of the current frontend. [Design system](DESIGN_SYSTEM.md)

## Layer and interaction guide

WeatherBackground mounts the gradient first, then ClearSky, CloudLayer, Precipitation, Thunderstorm, FogOverlay and WindEffects. When diagnosing a missing effect, inspect the provider code, wind speed and astronomy values before changing its animation. Changing the code or day/night value gives the gradient a new key and triggers its opacity transition.

The AI results use staggered child variants and a spring transition. For new hover or tap feedback, keep the action available to keyboard users and ensure focus remains visible. The original proposals for animated metric counters, route-wide transitions and offscreen pausing are design options. Profile a busy rainy or stormy screen before adding more continuous effects.
