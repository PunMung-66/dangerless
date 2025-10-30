"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapProvider } from "@/lib/map/contexts";
import { NavigationBar } from "@/components/map/NavigationBar";
import { MobileBottomSheet } from "@/components/map/MobileBottomSheet";
import { SidebarTray } from "@/components/map/SidebarTray";
import { SearchTray, NewsTray, ReportTray } from "@/components/map/trays";
import { MapSearchBar } from "@/components/map/MapSearchBar";
import { NewsMode } from "@/components/map/modes/NewsMode";
import { AddNewsMode } from "@/components/map/modes/AddNewsMode";
import { useAuth, formatUser, useNavigationState } from "@/lib/hooks";
import { NAV_BAR_WIDTH } from "@/lib/constants";

const MapCanvas = dynamic(
  () =>
    import("@/components/map/MapCanvas").then((mod) => ({
      default: mod.MapCanvas,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
        <span className="text-muted-foreground">Loading map...</span>
      </div>
    ),
  }
);

const TRAY_CONFIG = [
  { id: "search", title: "Search", component: SearchTray },
  { id: "news", title: "News & Alerts", component: NewsTray },
  { id: "report", title: "Report Issue", component: ReportTray },
] as const;

function MapPageContent() {
  const { user, signIn } = useAuth();
  const {
    activeTray,
    navBarExpanded,
    toggleTray,
    closeTray,
    setNavBarExpanded,
  } = useNavigationState();
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);

  const formattedUser = formatUser(user);
  const navBarWidth = navBarExpanded
    ? NAV_BAR_WIDTH.EXPANDED
    : NAV_BAR_WIDTH.COLLAPSED;

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // TODO: Implement profile modal
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <NavigationBar
        onItemClick={toggleTray}
        user={formattedUser}
        onSignIn={signIn}
        onProfileClick={handleProfileClick}
        onExpandChange={setNavBarExpanded}
      />

      {TRAY_CONFIG.map(({ id, title, component: Component }) => (
        <SidebarTray
          key={id}
          isOpen={activeTray === id}
          onClose={closeTray}
          title={title}
          leftOffset={navBarWidth}
        >
          <Component />
        </SidebarTray>
      ))}

      <MobileBottomSheet
        searchContent={<MapSearchBar className="w-full" />}
        newsContent={<NewsMode />}
        reportContent={<AddNewsMode />}
        user={formattedUser}
        onSignIn={signIn}
        onProfileClick={handleProfileClick}
        onExpandedChange={setIsMobileNavExpanded}
      />

      <div className="absolute inset-0">
        <MapCanvas hideMobileControls={isMobileNavExpanded} />
      </div>

      <div className="hidden lg:block absolute top-6 left-20 right-6 z-30 max-w-md pointer-events-none">
        <div className="pointer-events-auto">
          <MapSearchBar className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <MapProvider>
      <MapPageContent />
    </MapProvider>
  );
}
