import {
  Maximize2,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const CameraFeed: React.FC<{
  url: string;
  roomName: string;
  isActive: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
}> = ({ url, roomName, isActive, isFocused = false, onFocus }) => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());

  // Update timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative rounded overflow-hidden shadow transition-all duration-300 border-2 ${
        isFocused ? "ring-4 ring-green-500" : ""
      }`}
    >
      {/* === Stream Video === */}
      <img
        src={'http://10.101.103.93:8080/video'}
        alt={`Stream from ${roomName}`}
        className="w-full h-full object-cover"
      />

      {/* === Overlay Header === */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 text-white text-xs p-2 flex justify-between items-center">
        <span>{roomName}</span>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              isActive ? "bg-green-400" : "bg-red-500"
            } shadow`}
          ></div>
          <span>{timestamp}</span>
        </div>
      </div>

      {/* === Overlay Footer === */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
        <div className="flex justify-end">
          {onFocus && (
            <button
              onClick={onFocus}
              className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded"
              title="Focus View"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
