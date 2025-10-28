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
  address?: {
    [key: string]: string;
  };
};

export type ModeKey = "scouting" | "news" | "history";

export type ModeMenu = {
  key: ModeKey;
  label: string;
};