import { expect, test } from '@playwright/test';

const condition = { code: 'Rain', description: 'Rain', providerCode: 61 };
const current = {
  condition, temperature: 12, units: 'Metric', humidity: 80, windSpeed: 5,
  visibility: 8000, pressure: 1013, feelsLike: 11, windDirection: 45,
  isDay: 1, aqi: 90, uvIndex: 2, minTemperature: 10, maxTemperature: 14,
  precipitationChance: 65, latitude: 28.6, longitude: 77.2,
};

test('dashboard shows the European AQI and a failed forecast can be retried', async ({ page }) => {
  let failed = true;
  await page.route('**/api/v1/**', async route => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/hourly') && failed) return route.fulfill({ status: 503 });
    const data = path.endsWith('/current') ? current :
      path.endsWith('/forecast') ? { days: [] } :
      path.endsWith('/hourly') ? { hours: [] } : null;
    await route.fulfill({ json: { data, success: true, errors: [], meta: null } });
  });
  await page.goto('/');
  await expect(page.getByText('Very poor').first()).toBeVisible();
  const retry = page.getByRole('button', { name: 'Retry', exact: true });
  await expect(retry).toBeVisible({ timeout: 15000 });
  failed = false;
  await retry.click();
  await expect(retry).toHaveCount(0);
});

test('AI generation sends units and renders the three result fields', async ({ page }) => {
  await page.route('**/api/v1/Weather/current*', route => route.fulfill({
    json: { data: current, success: true, errors: [], meta: null },
  }));
  await page.route('**/api/v1/AiSummary', async route => {
    const request = route.request().postDataJSON();
    expect(request.temperature).toBe('12 \u00b0C');
    expect(request.wind).toBe('5 km/h');
    await route.fulfill({ json: { summary: 'Rain ahead', clothing: 'Raincoat', activity: 'Read indoors' } });
  });
  await page.goto('/ai-summary');
  await page.getByRole('button', { name: 'Generate Insight' }).click();
  for (const message of ['Rain ahead', 'Raincoat', 'Read indoors']) {
    await expect(page.getByText(message, { exact: true })).toBeVisible();
  }
});

test('a late AI result cannot replace the newly selected city', async ({ page }) => {
  await page.route('**/api/v1/Weather/current*', route => route.fulfill({
    json: { data: current, success: true, errors: [], meta: null },
  }));
  await page.route('**/api/v1/Location/search*', route => route.fulfill({
    json: { data: [{ name: 'Tokyo', country: 'Japan', region: 'Tokyo', latitude: 35.68,
      longitude: 139.69, timezone: 'Asia/Tokyo' }], success: true, errors: [], meta: null },
  }));
  let resume!: () => void;
  const delay = new Promise<void>(resolve => { resume = resolve; });
  await page.route('**/api/v1/AiSummary', async route => {
    await delay;
    await route.fulfill({ json: { summary: 'Previous city', clothing: 'Coat', activity: 'Read' } });
  });
  await page.goto('/ai-summary');
  const pending = page.waitForRequest('**/api/v1/AiSummary');
  await page.getByRole('button', { name: 'Generate Insight' }).click();
  await pending;
  await page.getByRole('textbox').fill('Tokyo');
  await page.getByText('Tokyo', { exact: true }).first().click();
  const completed = page.waitForResponse('**/api/v1/AiSummary');
  resume();
  await completed;
  await expect(page.getByRole('button', { name: 'Generate Insight' })).toBeVisible();
  await expect(page.getByText('Previous city')).toHaveCount(0);
});

test('display preferences survive reload and navigation', async ({ page }) => {
  await page.route('**/api/v1/**', route => route.fulfill({
    json: { data: route.request().url().includes('/current') ? current : null, success: true, errors: [], meta: null },
  }));
  await page.goto('/');
  await page.getByTitle('Settings').filter({ visible: true }).click();
  await page.getByRole('button', { name: 'Fahrenheit' }).click();
  await page.getByRole('button', { name: 'Close preferences' }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).filter({ visible: true }).click();
  const theme = await page.locator('html').getAttribute('class');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('class', theme!);
  await page.getByRole('link', { name: 'AI Summary' }).filter({ visible: true }).click();
  await expect(page).toHaveURL(/ai-summary$/);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('weatherwise-settings')!).state.units)).toBe('Imperial');
});

test('device location updates the selected city', async ({ context, page }) => {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: 35.68, longitude: 139.69 });
  await page.route('**/api/v1/**', route => {
    const url = new URL(route.request().url());
    const data = url.pathname.endsWith('/reverse') ? {
      name: 'Tokyo', country: 'Japan', region: 'Tokyo', latitude: 35.68, longitude: 139.69, timezone: 'Asia/Tokyo',
    } : url.pathname.endsWith('/current') ? current : null;
    return route.fulfill({ json: { data, success: true, errors: [], meta: null } });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Use device location' }).click();
  await expect(page.getByRole('textbox')).toHaveAttribute('placeholder', 'Tokyo, Japan');
});
