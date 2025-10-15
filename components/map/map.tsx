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
  const zoomTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        showCompass: false,
        showZoom: true,
      }),
      "bottom-left"
    );

    const marker = new maplibregl.Marker({ color: "#000" })
      .setLngLat([0, 0])
      .addTo(map);
    markerRef.current = marker;

    map.once("load", () => {
      try {
        map.easeTo({ zoom: 2, duration: 2000 });
      } catch (e) {
        console.warn("Zoom animation failed", e);
      }
    });

    return () => {
      // clear any pending zoom timeout
      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current);
        zoomTimeoutRef.current = null;
      }

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
    const lon = parseFloat(r.lon);
    const lat = parseFloat(r.lat);
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

    // move in and zoom to the place
    map.easeTo({ center: [lon, lat], zoom: 14 });

    // clear previous timeout if any
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
      zoomTimeoutRef.current = null;
    }

    // after a short delay, ease out a bit so the user sees context
    zoomTimeoutRef.current = setTimeout(() => {
      map.easeTo({ zoom: 13, duration: 1500 });
      zoomTimeoutRef.current = null;
    }, 1400);
    if (markerRef.current) markerRef.current.setLngLat([lon, lat]);
    else
      markerRef.current = new maplibregl.Marker({ color: "#d00" })
        .setLngLat([lon, lat])
        .addTo(map);
  }, [results, selectedIndex]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
