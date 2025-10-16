import { MapProvider } from "@/contexts/mapcontext";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <MapProvider>{children}</MapProvider>;
}
