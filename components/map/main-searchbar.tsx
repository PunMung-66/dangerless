import Image from "next/image";
import React from "react";
import IconSearch from "../../assets/logo/icon-search.svg";
import { useDataMap } from "../../contexts/mapcontext";
import MapButton from "./map-button";
import MapLoader from "./map-loader";

export default function MainSearchbar() {
  const {
    query,
    setQuery,
    geocode,
    setResults,
    setError,
    setLoading,
    loading,
    error,
    results,
    selectedIndex,
    setSelectedIndex,
  } = useDataMap();

  const [searchTerm, setSearchTerm] = React.useState<string | null>("");

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    setResults(null);
    setSelectedIndex(null);
    setSearchTerm(query);
    try {
      const res = await geocode(query, 1);
      if (!res) {
        setError("No results found");
        return;
      }
      setResults(res);
    } catch (err) {
      console.error(err);
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[280px] sm:max-w-[343px] absolute z-20  px-2 py-4 transition-transform duration-300 map-searchbar">
      <form onSubmit={onSearch} className="flex">
        <div className="flex flex-col w-full rounded-lg overflow-hidden bg-white text-black dark:bg-slate-950 dark:text-white shadow-md">
          <div className="flex items-center">
            {loading ? (
              <MapLoader />
            ) : (
              <button
                type="submit"
                className="flex-shrink-0 px-2 hover:opacity-70 transition-opacity"
                disabled={loading}
                aria-label="Search"
              >
                <Image
                  src={IconSearch}
                  alt=""
                  className="inline-block"
                  aria-hidden="true"
                />
              </button>
            )}
            <input
              aria-label="Search place"
              className="w-full p-2 text-xs border-b-1 border-gray-300 focus:outline-none bg-inherit"
              placeholder="Search for a district"
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-red-600 text-xs px-3 py-2">{error}</div>
          )}

          {results && searchTerm && (
            <div className="max-h-48 overflow-auto z-20">
              {results.map((r, i) => (
                <MapButton
                  key={r.place_id ?? `${i}`}
                  displayName={r.display_name}
                  isSelected={selectedIndex === i}
                  onClick={() => {
                    setSelectedIndex(i);
                    setSearchTerm(null);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
