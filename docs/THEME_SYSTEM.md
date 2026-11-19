# Theme system

The UI uses next-themes with system preference as the default and a root CSS class for light/dark tokens in `src/app/globals.css`. The visible toggle selects light or dark. UI theme preference and weather atmosphere are separate concerns.

The dashboard's WeatherBackground chooses gradients and layers from the weather provider code and wind, and computes a day/night value from astronomy. Some date strings can be interpreted in the browser timezone. Location-aware theming and timezone verification are future work. The application does not offer a weather-driven Auto mode selector.

Use semantic CSS tokens for readable UI on either theme. Check contrast over animated layers and at both desktop and mobile sizes. [Animations](ANIMATIONS.md)

## Choosing where a visual change belongs

| Change | Owner and behavior |
| --- | --- |
| Card surfaces, text and focus colors | Use semantic tokens from globals.css so a user's selected theme applies across screens. Check contrast with both backgrounds. |
| Weather atmosphere | WeatherBackground selects its gradient from the provider code. Clear daytime uses blues, fog uses slate, snow uses pale blues, and storms use dark slate and indigo. Wind drives a separate effects layer. |
| Day and night | The background compares the current time with astronomy sunrise and sunset. Before astronomy arrives it uses daytime styling. Test with a city outside the browser's timezone. |
| Future automatic palettes | Morning, noon, evening and golden-hour accent transitions belong to the original design proposal. They would require a location-aware time source and a defined interaction with the user's theme preference. |
