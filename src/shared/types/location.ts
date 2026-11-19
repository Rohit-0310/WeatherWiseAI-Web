export interface Location {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  region: string;
  timezone: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  errors: string[];
  meta: Record<string, unknown> | null;
}
