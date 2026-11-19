# API integration

The browser Axios client defaults to `https://localhost:7008/api/v1`. Set `NEXT_PUBLIC_WEATHER_API_URL` at build time and allow the matching browser origin in the backend. Requests currently require no caller credentials.

| Calls | Requests and consumption |
| --- | --- |
| GET `/Weather/current`, `/Weather/hourly`, `/Weather/forecast` | Coordinates and Metric/Imperial units. Uses default forecast window and provider timezone. Reads `response.data.data` |
| GET `/Weather/astronomy` | Coordinates. Uses the backend's default date. Reads the envelope data |
| GET `/Location/search` | Query and count 5. UI waits 500 ms and requires at least 3 characters. Reads an array from envelope data |
| GET `/Location/reverse` | Coordinates from browser geolocation. Reads a location from envelope data |
| POST `/AiSummary` | JSON strings `location`, `temperature`, `condition`, `humidity`, `wind`, `uvIndex`. Reads the plain `summary`, `clothing`, `activity` object |

GET envelopes contain `data`, `success`, `errors` (string array) and nullable `meta`. AI provider errors are HTTP 400 with nested `error`. Invalid model binding and handled backend exceptions can use the envelope instead. Axios logs and rethrows HTTP/network errors. AI generation catches errors and shows a retryable message. Hourly and daily panels distinguish loading, empty data and errors with retry. There is no shared structured error parser.

## Query policy

Default stale time is five minutes, with two retries and no window-focus refetch. Current weather is stale after five minutes and refetches on a 15-minute interval under the query library's normal activity rules. Hourly data uses 15 minutes, daily forecast and location queries one hour, and astronomy 24 hours. Queries key data by the search term or coordinates and include units for weather. AI generation is outside the query cache.

## Compatibility gaps

- AI sends temperature and wind with units from the current weather request.
- AQI can be null. Both air-quality displays use European AQI bands. Cloud cover is optional and shown as unavailable when omitted. Envelope meta can be null.
- Reverse geocoding uses a GMT placeholder. Several display paths parse offset-free timestamps using JavaScript dates. Verify local-time behavior across browser and forecast timezones before making accuracy claims.
- Hosted connectivity requires an explicit browser build URL and a matching backend origin.

## Compare requests in browser developer tools

With a city selected, inspect `GET /api/v1/Weather/hourly?Latitude=28.61&Longitude=77.21&Units=Metric`. A successful response has an object at `data` with coordinates, timezone, units and an array named `hours`. WeatherService extracts that object before the hook hands it to the component.

Generate on the AI Summary screen sends a snapshot like the following synthetic example:

```json
{"location":"New Delhi","temperature":"25 °C","condition":"Rain","humidity":"80%","wind":"12 km/h","uvIndex":"2"}
```

A successful POST returns the following shape, with text generated for the supplied snapshot:

```json
{"summary":"Rain is likely.","clothing":"Bring a raincoat.","activity":"Choose an indoor activity."}
```

An adapter failure produces a 400 with `error.message`; a model-binding failure can produce a 400 with `errors` in an envelope. The page displays its own failure message. A network or TLS failure may provide no HTTP body. Check the Network panel before attributing a failure to Gemini.
