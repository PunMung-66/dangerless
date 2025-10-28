"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useEffect, useRef } from "react";
import { useDataMap } from "../../contexts/mapcontext";

export default function MapComponent() {
  const { results, selectedIndex } = useDataMap();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
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
      center: [0, 0],
      zoom: 4,
    });

    mapRef.current = map;

    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      "bottom-left"
    );

    // Add geolocate control to center map on user's location
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

    map.once("load", () => {
      try {
        map.easeTo({ zoom: 2, duration: 2000 });
      } catch (e) {
        console.warn("Zoom animation failed", e);
      }
    });

    return () => {
      // clean up map and marker
      markerRef.current?.remove();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // react to selection changes
  useEffect(() => {
    if (!results || selectedIndex === null) return;
    const r = results[selectedIndex];
    if (!r) return;
    const map = mapRef.current;
    if (!map) return;

    // Remove previous area highlight if exists
    if (map.getLayer("area-highlight")) {
      map.removeLayer("area-highlight");
    }
    if (map.getLayer("area-highlight-outline")) {
      map.removeLayer("area-highlight-outline");
    }
    if (map.getSource("area-highlight")) {
      map.removeSource("area-highlight");
    }

    // Calculate bounding box and center
    let bounds: [[number, number], [number, number]] | null = null;
    let centerLon = parseFloat(r.lon);
    let centerLat = parseFloat(r.lat);

    // Add area highlight using geojson if available, otherwise fall back to boundingbox
    if (r.geojson && r.geojson.coordinates) {
      // Use actual polygon boundary from Nominatim
      map.addSource("area-highlight", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: r.geojson as GeoJSON.Geometry,
        },
      });

      // Add fill layer
      map.addLayer({
        id: "area-highlight",
        type: "fill",
        source: "area-highlight",
        paint: {
          "fill-color": "#3b82f6",
          "fill-opacity": 0.2,
        },
      });

      // Add outline layer
      map.addLayer({
        id: "area-highlight-outline",
        type: "line",
        source: "area-highlight",
        paint: {
          "line-color": "#2563eb",
          "line-width": 2,
        },
      });

      // Calculate bounds from bounding box if available
      if (r.boundingbox && r.boundingbox.length === 4) {
        const bbox = r.boundingbox
          .map((s) => parseFloat(s))
          .filter((n): n is number => !isNaN(n));

        if (bbox.length === 4) {
          const [south, north, west, east] = bbox as [
            number,
            number,
            number,
            number
          ];
          bounds = [
            [west, south],
            [east, north],
          ];
          // Calculate center of bounding box
          centerLon = (west + east) / 2;
          centerLat = (south + north) / 2;
        }
      }
    } else if (r.boundingbox && r.boundingbox.length === 4) {
      // Fall back to bounding box rectangle
      const bbox = r.boundingbox
        .map((s) => parseFloat(s))
        .filter((n): n is number => !isNaN(n));

      if (bbox.length === 4) {
        const [south, north, west, east] = bbox as [
          number,
          number,
          number,
          number
        ];

        // Calculate center of bounding box
        centerLon = (west + east) / 2;
        centerLat = (south + north) / 2;

        bounds = [
          [west, south],
          [east, north],
        ];

        map.addSource("area-highlight", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [west, south],
                  [east, south],
                  [east, north],
                  [west, north],
                  [west, south],
                ],
              ],
            },
          },
        });

        map.addLayer({
          id: "area-highlight",
          type: "fill",
          source: "area-highlight",
          paint: {
            "fill-color": "#3b82f6",
            "fill-opacity": 0.2,
          },
        });

        map.addLayer({
          id: "area-highlight-outline",
          type: "line",
          source: "area-highlight",
          paint: {
            "line-color": "#2563eb",
            "line-width": 2,
          },
        });
      }
    }

    // Update marker position to center of area
    if (markerRef.current) markerRef.current.setLngLat([centerLon, centerLat]);
    else
      markerRef.current = new maplibregl.Marker({ color: "#d00" })
        .setLngLat([centerLon, centerLat])
        .addTo(map);

    // Fit the map to the bounds if available, otherwise center on the point
    if (bounds) {
      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        duration: 1500,
      });
    } else {
      // No bounding box, just center on the point with default zoom
      map.easeTo({ center: [centerLon, centerLat], zoom: 14, duration: 1500 });
    }
  }, [results, selectedIndex]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
