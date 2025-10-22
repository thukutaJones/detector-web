import { baseUrl } from "@/constants/baseUrl";
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
  room: string;
  decision: string;
}

interface AlertsPanelProps {
  alertsPanelOpen: boolean;
  alerts: any[];
  setAlertsPanelOpen: (open: boolean) => void;
  socket: any;
}

type Severity = "high" | "medium" | "low";

const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alertsPanelOpen,
  alerts,
  setAlertsPanelOpen,
  socket,
}) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [nudgeLoading, setNudgeLoading] = useState<boolean>(false);
  const [nudgeSuccess, setNudgeSuccess] = useState<boolean>(false);

  const formatTime = (timestamp: string): string => {
    const year = timestamp.slice(0, 4);
    const month = timestamp.slice(4, 6);
    const day = timestamp.slice(6, 8);
    const hour = timestamp.slice(9, 11);
    const minute = timestamp.slice(11, 13);

    return `${hour}:${minute}`;
  };

  const getTrackInfo = (message: string): string => {
    const match = message.match(/Track (\d+)/);
    return match ? `Track ${match[1]}` : "Unknown Track";
  };

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

  const handleNudge = async (room: string, alertId: string) => {
    if (!room || !alertId) {
      console.warn("Missing room or alertId");
      return;
    }

    if (!socket?.connected) {
      console.warn("Socket not connected");
      return;
    }

    try {
      setNudgeLoading(true);
      setNudgeSuccess(false);

      // Emit the nudge
      socket.emit("nudge", { room, alertId });

      // Simulate optimistic UI or use callback/ack if implemented on server
      setTimeout(() => {
        setNudgeSuccess(true);
        setNudgeLoading(false);

        // Auto-hide success indicator after 2s
        setTimeout(() => setNudgeSuccess(false), 2000);
      }, 500);
    } catch (error) {
      console.log("Failed to send nudge:", error);
      setNudgeLoading(false);
    }
  };

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
                className="px-6 py-4 border-b border-gray-100 hover:bg-white transition-colors group"
              >
                <div className="flex items-center justify-between">
                  {/* Left Content */}
                  <div className="flex items-start gap-4">
                    {/* Status/Decision Dot */}
                    <div
                      className={`w-3 h-3 mt-1.5 rounded-full ${
                        alert.status === "pending"
                          ? "bg-yellow-400"
                          : alert.status === "reviewed" &&
                            alert.decision === "cheating"
                          ? "bg-red-500"
                          : alert.status === "reviewed" &&
                            alert.decision === "normal"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />

                    {/* Alert Info */}
                    <div className="flex flex-col text-sm gap-1.5">
                      {/* Track Info + Timestamp */}
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 leading-tight">
                          {getTrackInfo(alert.message)}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {formatTime(alert.timestamp)}
                        </span>
                      </div>

                      {/* Alert Title */}
                      <p className="text-xs text-gray-600">{alert.title}</p>

                      {/* Room Info */}
                      <p className="text-xs text-gray-400 font-medium">
                        Room: {alert.room}
                      </p>

                      {/* Status & Decision Badges */}
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        {/* Status Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                            alert.status === "reviewed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {alert.status}
                        </span>

                        {/* Decision Badge */}
                        {alert.status === "reviewed" &&
                          alert.decision === "cheating" && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold capitalize">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              Cheating
                            </span>
                          )}

                        {alert.status === "reviewed" &&
                          alert.decision === "normal" && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold capitalize">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              Normal
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Review Button */}
                  <button
                    onClick={() => openReviewModal(alert)}
                    className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors hover:underline"
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
                    onClick={() =>
                      handleNudge(selectedAlert?.room, selectedAlert?.id)
                    }
                    disabled={nudgeLoading}
                    className={`${
                      nudgeLoading ? "opacity-70 cursor-not-allowed" : ""
                    } bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2`}
                    type="button"
                  >
                    {nudgeLoading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : nudgeSuccess ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-white" />
                        Sent
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Nudge
                      </>
                    )}
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
