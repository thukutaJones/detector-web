import { baseUrl } from "@/constants/baseUrl";
import { Maximize2 } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

interface CameraFeedProps {
  url: string;
  roomName: string;
  isActive: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
  schedule_id: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({
  url,
  roomName,
  isActive,
  isFocused = false,
  onFocus,
  schedule_id
}) => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());
  const [imageData, setImageData] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const socketRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const socket = io(baseUrl, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("start_stream", {
        url,
        room: roomName,
        method: "Network camera",
        schedule_id: schedule_id,
      });
    });

    socket.on("stream_frame", (data) => {
      if (data.room === roomName && data.image) {
        setImageData(`data:image/jpeg;base64,${data.image}`);
        setHasError(false);
      }
    });

    socket.on("connect_error", () => {
      setHasError(true);
    });

    socket.on("disconnect", () => {
      setHasError(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomName, url]); 

  return (
    <div
      className={`relative rounded overflow-hidden transition-all duration-300 min-h-[20vh] border ${
        isFocused ? "ring-2 ring-green-600 scale-[1.01]" : "hover:scale-[1.01]"
      }`}
    >
      {/* Video feed display logic */}
      {!imageData && !hasError ? (
        <div className="flex justify-center items-center h-[30vh] text-gray-500 text-sm">
          Loading stream...
        </div>
      ) : hasError ? (
        <img
          src="/videoFeedError1.jpg"
          alt="Stream Error"
          className="object-cover h-[30vh] w-full"
        />
      ) : (
        <img
          src={imageData|| '/videoFeedError1.jpg'}
          alt={`Stream from ${roomName}`}
          className="w-full h-full object-cover"
        />
      )}

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 text-white text-xs p-2 flex justify-between items-center z-10">
        <span className="font-semibold">{roomName}</span>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              isActive ? "bg-green-400" : "bg-red-500"
            } shadow`}
          ></div>
          <span>{timestamp}</span>
        </div>
      </div>

      {/* Focus button overlay */}
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
