import { useCallback } from "react";
import { useMapData, useMapView, useMapMode } from "../contexts";
import { MAP_MODES } from "../constants";

export function useMapSelection() {
  const { results, selectedIndex, setSelectedIndex } = useMapData();
  const { focusOnLocation } = useMapView();
  const { setMode } = useMapMode();

  const selectLocation = useCallback((index: number) => {
    if (!results || index < 0 || index >= results.length) return;
    
    const location = results[index];
    if (!location) return;
    
    setSelectedIndex(index);
    focusOnLocation(location);
    setMode(MAP_MODES.SCOUTING);
  }, [results, setSelectedIndex, focusOnLocation, setMode]);

  const clearSelection = useCallback(() => {
    setSelectedIndex(null);
  }, [setSelectedIndex]);

  const selectedLocation = results && selectedIndex !== null ? results[selectedIndex] : null;

  return {
    results,
    selectedIndex,
    selectedLocation,
    selectLocation,
    clearSelection,
    hasResults: Boolean(results && results.length > 0),
    hasSelection: selectedIndex !== null,
  };
}