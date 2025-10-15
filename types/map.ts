export type NominatimResult = {
  place_id?: number | string;
  display_name: string;
  lat: string;
  lon: string;
  boundingbox?: string[];
  class?: string;
  type?: string;
  geojson?: {
    type: string;
    coordinates: number[] | number[][] | number[][][] | number[][][][];
  };
};
