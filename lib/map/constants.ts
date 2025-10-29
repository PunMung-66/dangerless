export const MAP_MODES = {
  SEARCH: 'search',
  SCOUTING: 'scouting', 
  NEWS: 'news',
  HISTORY: 'history',
  ADD_NEWS: 'addnew'
} as const;

export const DETAIL_BAR_CONFIG = {
  MOBILE: {
    COLLAPSED_HEIGHT: 0,
    PARTIAL_HEIGHT: 300,
    FULL_HEIGHT: 500,
  },
  DESKTOP: {
    COLLAPSED_WIDTH: 0,
    EXPANDED_WIDTH: 400,
  }
} as const;

export const MAP_CONFIG = {
  DEFAULT_CENTER: [0, 0] as [number, number],
  DEFAULT_ZOOM: 4,
  SELECTED_ZOOM: 14,
  ANIMATION_DURATION: 1500,
  ZOOM_ANIMATION_DURATION: 2000,
  SEARCH_LIMIT: 5,
} as const;

export const API_CONFIG = {
  GEOCODING_ENDPOINT: '/api/map',
  NOMINATIM_BASE_URL: 'https://nominatim.openstreetmap.org',
} as const;