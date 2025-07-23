import { AlertTriangle, Bell, X } from "lucide-react";
import React from "react";

const AlertsPanel = ({
  alertsPanelOpen,
  alerts,
  setAlertsPanelOpen,
}: {
  alertsPanelOpen: any;
  alerts: any;
  setAlertsPanelOpen: any;
}) => (
  <div
    className={`bg-white transition-all duration-500 ease-in-out ${
      alertsPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div className="p-4 border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 p-2 rounded-lg relative">
            <Bell className="h-4 w-4 text-yellow-600" />
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
              {alerts.filter((a: any) => a.severity === "high").length}
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Alerts</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAlertsPanelOpen(false)}
            className="text-gray-400 p-1 hover:text-red-600 transition-colors"
          >
            <X className="h-4 w-4 hover:sclae-110" />
          </button>
        </div>
      </div>
    </div>

    <div className="h-[calc(100vh-160px)] overflow-y-auto scroll-container">
      {alerts.map((alert: any, index: number) => (
        <div
          key={index?.toString()}
          className="p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-1 relative rounded-full flex-shrink-0 ${
                alert.severity === "high"
                  ? "bg-red-100"
                  : alert.severity === "medium"
                  ? "bg-yellow-100"
                  : "bg-blue-100"
              }`}
            >
              <AlertTriangle
                className={`h-3 w-3 ${
                  alert.severity === "high"
                    ? "text-red-600"
                    : alert.severity === "medium"
                    ? "text-yellow-600"
                    : "text-blue-600"
                }`}
              />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {alert.room}
                </p>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {alert.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-tight">
                {alert.message}
              </p>
              <div className="w-full flex flex-row items-center justify-end mt-2">
                <button className="bg-red-50 py-1 px-2 rounded-full hover:scale-105">
                  <p className="text-red-600 text-xs">Not Reviewed</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AlertsPanel;
