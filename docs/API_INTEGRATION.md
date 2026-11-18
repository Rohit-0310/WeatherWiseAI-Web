# API integration

The shared Axios client in `src/shared/api/axios.ts` uses `https://localhost:7008/api/v1`. Calls run in the browser with JSON content type. No token, cookie credentials or env-based URL override is configured. The companion backend allows `http://localhost:3000` and requires a trusted HTTPS certificate locally. [Backend contract](https://github.com/Rohit-0310/WeatherWiseAI-API/blob/main/docs/API_GUIDELINES.md)

| Calls | Requests and consumption |
| --- | --- |
| GET `/Weather/current`, `/Weather/hourly`, `/Weather/forecast` | Coordinates and Metric/Imperial units. Uses default forecast window and provider timezone. Reads `response.data.data` |
| GET `/Weather/astronomy` | Coordinates. Uses the backend's default date. Reads the envelope data |
| GET `/Location/search` | Query and count 5. UI waits 500 ms and requires at least 3 characters. Reads an array from envelope data |
| GET `/Location/reverse` | Coordinates from browser geolocation. Reads a location from envelope data |
| POST `/AiSummary` | JSON strings `location`, `temperature`, `condition`, `humidity`, `wind`, `uvIndex`. Reads the plain `summary`, `clothing`, `activity` object |

GET envelopes contain `data`, `success`, `errors` (string array) and nullable `meta`. AI provider errors are HTTP 400 with nested `error`. Invalid model binding and handled backend exceptions can use the envelope instead. Axios logs and rethrows HTTP/network errors. AI generation catches errors and shows a generic retryable message. Dashboard panels use loading or empty states. Some failures share the loading path, so a failed call can look like a persistent skeleton. There is no shared structured error parser.

## Query policy

Default stale time is five minutes, with two retries and no window-focus refetch. Current weather is stale after five minutes and refetches on a 15-minute interval under the query library's normal activity rules. Hourly data uses 15 minutes, daily forecast and location queries one hour, and astronomy 24 hours. Queries key data by the search term or coordinates and include units for weather. AI generation is outside the query cache.

## Compatibility gaps

- AI sends temperature and wind as numeric strings without units. The backend prompt forwards them verbatim. The unit context can be ambiguous.
- The frontend current-weather type requires cloud cover and permits optional sunrise and sunset fields. The backend current response omits all three. Astronomy has its own endpoint. The frontend also models envelope `meta` as an object, while the backend commonly returns null.
- Reverse geocoding uses a GMT placeholder. Several display paths parse offset-free timestamps using JavaScript dates. Verify local-time behavior across browser and forecast timezones before making accuracy claims.
- Browser URL and CORS origin are fixed. Hosted environments need an agreed configuration strategy.
