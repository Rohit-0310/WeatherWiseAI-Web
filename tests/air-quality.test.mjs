import assert from 'node:assert/strict';
import test from 'node:test';
import { getAqiDetails } from '../src/shared/utils/air-quality.ts';

test('European AQI band edges and unavailable readings', () => {
  for (const [value, label] of [
    [null, 'Unavailable'], [0, 'Good'], [20, 'Good'], [21, 'Fair'], [40, 'Fair'],
    [41, 'Moderate'], [60, 'Moderate'], [61, 'Poor'], [80, 'Poor'],
    [81, 'Very poor'], [90, 'Very poor'], [100, 'Very poor'], [101, 'Extremely poor'],
  ]) assert.equal(getAqiDetails(value).label, label);
});
