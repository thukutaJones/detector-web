import { Maximize2 } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

interface CameraFeedProps {
  url: string;
  roomName: string;
  isActive: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
}

const CameraFeed: React.FC<CameraFeedProps> = ({
  url,
  roomName,
  isActive,
  isFocused = false,
  onFocus,
}) => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());
  const [imageData, setImageData] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Set up timestamp
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const socket = io(url, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
    });
    socketRef.current = socket;

    // Start the stream
    socket.emit("start_stream", {
      url, // stream source URL
      room: roomName,
      method: "MANUAL", // optional, you can adjust
      exam_id: "12345", // optional, placeholder
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
      {imageData && !hasError ? (
        <img
          src={imageData}
          alt={`Stream from ${roomName}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src="/videoFeedError.png"
          alt="Stream Error"
          className="object-contain h-[30vh] w-full"
        />
      )}

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
