import { MapProvider, MapStageProvider } from "@/contexts/mapcontext";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <MapProvider>
      <MapStageProvider>{children}</MapStageProvider>
    </MapProvider>
  );
}
