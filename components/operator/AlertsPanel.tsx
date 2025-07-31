import { baseUrl } from "@/constants/baseUrl";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Bell, X, Zap, CheckCircle, Camera } from "lucide-react";
import React, { useState } from "react";

interface Alert {
  method: string;
  evidence: string;
  frames: string[];
  timestamp: string;
  title: string;
  message: string;
  schedule: string;
  created_at: string;
  status: "pending" | "reviewed" | "dismissed";
  created: string;
  updated: string;
  id: string;
}

interface AlertsPanelProps {
  alertsPanelOpen: boolean;
  alerts: any[];
  setAlertsPanelOpen: (open: boolean) => void;
  setAlerts: any;
  handleAlert: ({
    variant,
    message,
  }: {
    variant: "info" | "error" | "success";
    message: string;
  }) => void;
}

type Severity = "high" | "medium" | "low";

const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alertsPanelOpen,
  alerts,
  setAlerts,
  setAlertsPanelOpen,
  handleAlert,
}) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const socketRef = useRef<any>(null);

  // Helper function to format timestamp
  const formatTime = (timestamp: string): string => {
    const year = timestamp.slice(0, 4);
    const month = timestamp.slice(4, 6);
    const day = timestamp.slice(6, 8);
    const hour = timestamp.slice(9, 11);
    const minute = timestamp.slice(11, 13);

    return `${hour}:${minute}`;
  };

  // Helper function to extract track number from message
  const getTrackInfo = (message: string): string => {
    const match = message.match(/Track (\d+)/);
    return match ? `Track ${match[1]}` : "Unknown Track";
  };

  // Helper function to determine severity
  const getSeverity = (alert: Alert): Severity => {
    const trackMatch = alert.message.match(/Track (\d+)/);
    const trackNumber = trackMatch ? parseInt(trackMatch[1]) : 0;

    if (trackNumber > 25) return "high";
    if (trackNumber > 10) return "medium";
    return "low";
  };

  const highSeverityCount = alerts.filter(
    (alert: Alert) => getSeverity(alert) === "high"
  ).length;

  const openReviewModal = (alert: Alert): void => {
    setSelectedAlert(alert);
    setCurrentImageIndex(0);
    setReviewModalOpen(true);
  };

  const closeReviewModal = (): void => {
    setReviewModalOpen(false);
    setSelectedAlert(null); 
    setCurrentImageIndex(0);
  };

  const nextImage = (): void => {
    if (selectedAlert && currentImageIndex < selectedAlert.frames.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = (): void => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNudge = (): void => {
    console.log("Nudge sent to security team!");
  };

  const handleMarkReviewed = (): void => {
    alert("Marked as reviewed!");
    closeReviewModal();
  };

  useEffect(() => {
    const socket = io(baseUrl, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("connected");
      handleAlert({
        variant: "success",
        message: "Connected to socket server",
      });
    });

    socket.on("suspicious_alert", (newAlert: any) => {
      console.log("new alert");

      handleAlert({
        variant: "info",
        message: "New alert received",
      });
      console.log("New alert received:", newAlert);
      // setAlerts((prevAlerts: any[]) => [newAlert, ...prevAlerts]);
    });

    socket.on("connect_error", () => {
      console.log("error");

      handleAlert({
        variant: "error",
        message: "Faield to connect to socket server",
      });
      // setHasError(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");

      handleAlert({
        variant: "error",
        message: "socket server disconnected",
      });
      // setHasError(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className={`bg-white border-l border-gray-200 transition-all duration-300 ease-in-out ${
          alertsPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {highSeverityCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium">
                    {highSeverityCount}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
            </div>
            <button
              onClick={() => setAlertsPanelOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto">
          {alerts.map((alert: Alert, index: number) => {
            const severity = getSeverity(alert);

            return (
              <div
                key={alert.id}
                className="px-6 py-4 border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        severity === "high"
                          ? "bg-red-500"
                          : severity === "medium"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          {getTrackInfo(alert.message)}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatTime(alert.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {alert.title}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openReviewModal(alert)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    type="button"
                  >
                    Check
                  </button>
                </div>
              </div>
            );
          })}

          {alerts.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <CheckCircle className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-gray-500 text-sm">No active alerts</p>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {getTrackInfo(selectedAlert.message)}
                </h2>
                <p className="text-sm text-gray-500">{selectedAlert.title}</p>
              </div>
              <button
                onClick={closeReviewModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Image Display */}
              <div className="bg-gray-100 rounded-lg mb-6 relative overflow-hidden">
                {selectedAlert.frames && selectedAlert.frames.length > 0 ? (
                  <div className="relative">
                    <img
                      src={
                        hasError
                          ? "/videoFeedError1.jpg"
                          : `${baseUrl}${selectedAlert.frames[currentImageIndex]}`
                      }
                      alt={`Evidence frame ${currentImageIndex + 1}`}
                      className={`${
                        hasError ? "object-cover" : "object-contain"
                      } w-full h-80`}
                      // onError={() => setHasError(true)}
                    />

                    {/* Image Navigation */}
                    {selectedAlert.frames.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          disabled={currentImageIndex === 0}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          type="button"
                        >
                          ←
                        </button>
                        <button
                          onClick={nextImage}
                          disabled={
                            currentImageIndex ===
                            selectedAlert.frames.length - 1
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          type="button"
                        >
                          →
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {selectedAlert.frames.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {currentImageIndex + 1} / {selectedAlert.frames.length}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-80 text-gray-400">
                    <div className="text-center">
                      <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No evidence available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end">
                <div className="flex gap-3">
                  <button
                    onClick={handleNudge}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2"
                    type="button"
                  >
                    <Zap className="h-4 w-4" />
                    Nudge
                  </button>

                  <button
                    onClick={closeReviewModal}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertsPanel;
