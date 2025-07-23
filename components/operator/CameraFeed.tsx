import {
  Camera,
  Eye,
  Maximize2,
  Monitor,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useState } from "react";

const CameraFeed: React.FC<{
  url: string;
  roomName: string;
  isActive: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
}> = ({ url, roomName, isActive, isFocused = false, onFocus }) => {
  return (
    <div
      className={`relative rounded shadow transition-all duration-300 z-50`}
    >
      <div
        className={`flex items-center justify-center relative aspect-video`}
      >
        <div className="absolute top-0 left-0 right-0 bg-transparent p-3">
          <div className="flex justify-between items-start text-gray-600 font-bold text-xs">
            <div>
              <div className="text-xs">{roomName}</div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  isActive ? "bg-green-500" : "bg-red-500"
                } shadow-lg`}
              ></div>
              <span className="text-xs">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/10 to-transparent rounded-b">
          <div className="flex justify-end items-center">
            <div className="flex gap-2">
              {onFocus && (
                <button
                  onClick={onFocus}
                  className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded transition-colors"
                  title="Focus View"
                >
                  <Maximize2 className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
