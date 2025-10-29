import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { useMapView } from "../contexts";
import { MAP_CONFIG } from "../constants";

export function useMapInstance(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const { center, zoom, bounds } = useMapView();
  const isInitialized = useRef(false);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: center,
      zoom: zoom,
    });

    mapRef.current = map;

    // Add controls
    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      "bottom-left"
    );

    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      }),
      "bottom-left"
    );

    // Mark as initialized after map loads
    map.once("load", () => {
      isInitialized.current = true;
    });

    return () => {
      map.remove();
      mapRef.current = null;
      isInitialized.current = false;
    };
  }, [containerRef, center, zoom]);

  // Update map view when context changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isInitialized.current) return;

    if (bounds) {
      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        duration: MAP_CONFIG.ANIMATION_DURATION,
      });
    } else {
      map.easeTo({
        center,
        zoom,
        duration: MAP_CONFIG.ANIMATION_DURATION,
      });
    }
  }, [center, zoom, bounds]);

  return {
    map: mapRef.current,
    isReady: Boolean(mapRef.current),
  };
}
