import { Maximize2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface CameraFeedProps {
  url: string;
  roomName: string;
  isActive: boolean;
  isFocused?: boolean;
  onFocus?: () => void;
  schedule_id: string;
  setAlerts: any;
  handleAlert: (args: {
    variant: "info" | "error" | "success";
    message: string;
  }) => void;
  socket: any;
}

const CameraFeed: React.FC<CameraFeedProps> = ({
  url,
  roomName,
  isActive,
  isFocused = false,
  onFocus,
  schedule_id,
  setAlerts,
  handleAlert,
  socket,
}) => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());
  const [hasError, setHasError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastRenderTimeRef = useRef<number>(0);
  const FRAME_INTERVAL = 100; // 10 FPS

  // Update timestamp every second
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("start_stream", {
      url,
      room: roomName,
      method: "Network camera",
      schedule_id,
    });

    const handleFrame = (data: any) => {
      if (
        data.room === roomName &&
        data.image &&
        Date.now() - lastRenderTimeRef.current >= FRAME_INTERVAL
      ) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          // Auto resize canvas to match image
          if (canvas.width !== img.width) canvas.width = img.width;
          if (canvas.height !== img.height) canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          setHasError(false);
        };
        img.onerror = () => {
          setHasError(true);
        };
        img.src = `data:image/jpeg;base64,${data.image}`;
        lastRenderTimeRef.current = Date.now();
      }
    };

    const handleSuspiciousAlert = (newAlert: any) => {
      handleAlert({
        variant: "info",
        message: "New alert received",
      });

      setAlerts((prev: any[]) => [newAlert, ...prev]);
    };

    const handleConnectError = () => {
      setHasError(true);
    };

    const handleDisconnect = () => {
      setHasError(true);
    };

    socket.on("stream_frame", handleFrame);
    socket.on("suspicious_alert", handleSuspiciousAlert);
    socket.on("connect_error", handleConnectError);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("stream_frame", handleFrame);
      socket.off("suspicious_alert", handleSuspiciousAlert);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
    };
  }, [roomName, url, socket, schedule_id]);

  return (
    <div
      className={`relative rounded overflow-hidden transition-all duration-300 min-h-[20vh] border ${
        isFocused ? "ring-2 ring-green-600 scale-[1.01]" : "hover:scale-[1.01]"
      }`}
    >
      {/* Video Canvas */}
      {hasError ? (
        <img
          src="/videoFeedError1.jpg"
          alt="Stream Error"
          className="object-cover h-[30vh] w-full"
        />
      ) : (
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
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

      {/* Focus button */}
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
