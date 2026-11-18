# Theme system

The UI uses next-themes with system preference as the default and a root CSS class for light/dark tokens in `src/app/globals.css`. The visible toggle selects light or dark. UI theme preference and weather atmosphere are separate concerns.

The dashboard's WeatherBackground chooses gradients and layers from the weather provider code and wind, and computes a day/night value from astronomy. Some date strings can be interpreted in the browser timezone. Location-aware theming and timezone verification are future work. The application does not offer a weather-driven Auto mode selector.

Use semantic CSS tokens for readable UI on either theme. Check contrast over animated layers and at both desktop and mobile sizes. [Animations](ANIMATIONS.md)
