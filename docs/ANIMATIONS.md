# Animations

The dashboard mounts WeatherBackground behind the content. Framer Motion and CSS render clear sky, cloud, rain/snow, fog, wind and thunderstorm effects according to available weather data. Rain and snow use DOM particles. The AI Summary page uses its own DOM transitions for generation and result cards.

Prefer transform and opacity for new effects. Use non-blocking decorative layers and verify reduced motion and contrast, especially for precipitation and lightning. Comprehensive reduced-motion handling and performance measurements are open work. No 3D weather scene is part of the current frontend. [Design system](DESIGN_SYSTEM.md)
