"use client";

import React, { useState } from "react";
import { Layers, MapIcon, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMapLayer } from "@/lib/map/contexts";
import { MAP_LAYERS, MAP_LAYER_INFO } from "@/lib/map/constants";
import type { MapLayer } from "@/types/map";

const LAYER_ICONS: Record<MapLayer, React.ReactNode> = {
  [MAP_LAYERS.STANDARD]: <MapIcon className="h-4 w-4" />,
  [MAP_LAYERS.SATELLITE]: <Globe className="h-4 w-4" />,
  [MAP_LAYERS.HYBRID]: <MapPin className="h-4 w-4" />,
};

export function LayerSelector() {
  const { layer, setLayer } = useMapLayer();
  const [isOpen, setIsOpen] = useState(false);

  const handleLayerChange = (newLayer: MapLayer) => {
    setLayer(newLayer);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <div className="bg-background/75 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-10 w-10 rounded-none hover:bg-foreground/10 active:bg-foreground/15 transition-all duration-200",
            isOpen && "bg-foreground/10"
          )}
          aria-label="Change map layer"
          type="button"
        >
          <Layers className="h-5 w-5 text-foreground/80" strokeWidth={2} />
        </Button>
      </div>

      {/* Layer Options Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[999]"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-12 z-[1000] min-w-[200px] bg-background/95 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-border/20">
            <div className="p-2 space-y-1">
              {(Object.keys(MAP_LAYERS) as Array<keyof typeof MAP_LAYERS>).map(
                (key) => {
                  const layerValue = MAP_LAYERS[key];
                  const layerInfo = MAP_LAYER_INFO[layerValue];
                  const isActive = layer === layerValue;

                  return (
                    <button
                      key={layerValue}
                      onClick={() => handleLayerChange(layerValue)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-foreground/5 text-foreground/80"
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0",
                          isActive
                            ? "text-primary-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        {LAYER_ICONS[layerValue]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            "font-medium text-sm",
                            isActive
                              ? "text-primary-foreground"
                              : "text-foreground"
                          )}
                        >
                          {layerInfo.name}
                        </div>
                        <div
                          className={cn(
                            "text-xs",
                            isActive
                              ? "text-primary-foreground/80"
                              : "text-foreground/60"
                          )}
                        >
                          {layerInfo.description}
                        </div>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
