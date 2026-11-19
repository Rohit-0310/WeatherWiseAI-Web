export function getAqiDetails(aqi: number | null) {
  if (aqi == null) return { label: 'Unavailable', color: 'text-muted-foreground' };
  if (aqi <= 20) return { label: 'Good', color: 'text-emerald-400' };
  if (aqi <= 40) return { label: 'Fair', color: 'text-lime-400' };
  if (aqi <= 60) return { label: 'Moderate', color: 'text-yellow-400' };
  if (aqi <= 80) return { label: 'Poor', color: 'text-red-400' };
  if (aqi <= 100) return { label: 'Very poor', color: 'text-purple-400' };
  return { label: 'Extremely poor', color: 'text-rose-600' };
}
