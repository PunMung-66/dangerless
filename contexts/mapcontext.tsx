"use client";

import React, { createContext, useContext, useState } from "react";
import type { NominatimResult } from "../types/map";

type MapContextType = {
  query: string;
  setQuery: (q: string) => void;
  results: NominatimResult[] | null;
  setResults: (r: NominatimResult[] | null) => void;
  loading: boolean;
  setLoading: (b: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
  selectedIndex: number | null;
  setSelectedIndex: (i: number | null) => void;
  geocode: (q: string, limit?: number) => Promise<NominatimResult[] | null>;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function useDataMap() {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useDataMap must be used within MapProvider");
  return ctx;
}

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  async function geocode(
    q: string,
    limit = 5
  ): Promise<NominatimResult[] | null> {
    if (!q) return null;
    const url = `/api/map?q=${encodeURIComponent(q)}&limit=${encodeURIComponent(
      String(limit)
    )}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Nominatim proxy error: ${res.status}`);
      const data = await res.json();
      if (!data || data.length === 0) return null;
      return data as NominatimResult[];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const value: MapContextType = {
    query,
    setQuery,
    results,
    setResults,
    loading,
    setLoading,
    error,
    setError,
    selectedIndex,
    setSelectedIndex,
    geocode,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
