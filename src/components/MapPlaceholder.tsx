
import React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PinData {
  id: string;
  x: number;
  y: number;
  category: string;
  status: "reported" | "acknowledged" | "in-progress" | "resolved" | "rejected";
}

interface MapPlaceholderProps {
  className?: string;
  pins?: PinData[];
  onPinClick?: (id: string) => void;
  selectedPinId?: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  className,
  pins = [],
  onPinClick,
  selectedPinId,
}) => {
  const getPinColor = (status: string) => {
    switch (status) {
      case "reported":
        return "text-orange-500";
      case "acknowledged":
        return "text-blue-500";
      case "in-progress":
        return "text-yellow-500";
      case "resolved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      className={cn(
        "relative bg-muted rounded-lg overflow-hidden ndebele-pattern",
        className
      )}
    >
      <div className="absolute inset-0 bg-bulafix-teal/10 backdrop-blur-[2px]"></div>
      
      {/* City outline placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          className="w-4/5 h-4/5 text-bulafix-teal/20 dark:text-bulafix-teal/30"
        >
          <path
            d="M30,70 Q50,20 100,30 Q150,40 170,80 Q190,120 160,150 Q130,180 90,170 Q50,160 30,120 Q10,80 30,70 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      
      {/* Map pins */}
      {pins.map((pin) => (
        <button
          key={pin.id}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all",
            selectedPinId === pin.id && "animate-marker-bounce z-10",
            getPinColor(pin.status)
          )}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          onClick={() => onPinClick?.(pin.id)}
        >
          <MapPin
            size={selectedPinId === pin.id ? 30 : 24}
            className={cn(
              "filter drop-shadow-md transition-all",
              selectedPinId === pin.id && "fill-current"
            )}
          />
        </button>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-md p-2 text-xs border">
        <div className="font-semibold mb-1">Map Legend</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-orange-500" />
            <span>Reported</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-blue-500" />
            <span>Acknowledged</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-yellow-500" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-green-500" />
            <span>Resolved</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-red-500" />
            <span>Rejected</span>
          </div>
        </div>
      </div>
      
      {/* Demo notice */}
      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1 text-xs border">
        Demo Map
      </div>
    </div>
  );
};
