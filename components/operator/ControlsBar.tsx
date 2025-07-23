import {
  Bell,
  ChevronDown,
  Grid3X3,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightOpen,
  Rows3,
  Square,
} from "lucide-react";
import React from "react";

type GridLayout = "2x2" | "3x3" | "4x4" | "1x1" | "adaptive";

const ControlsBar = ({
  selectedRoom,
  setSelectedRoom,
  cameras,
  scheduleData,
  setViewMode,
  viewMode,
  setGridLayout,
  gridLayout,
  alertsPanelOpen,
  setAlertsPanelOpen,
  alerts,
}: {
  selectedRoom: any;
  setSelectedRoom: any;
  cameras: any;
  scheduleData: any;
  setViewMode: any;
  viewMode: any;
  setGridLayout: any;
  gridLayout: any;
  alertsPanelOpen: any;
  setAlertsPanelOpen: any;
  alerts: any;
}) => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Rooms ({cameras?.length} cameras)</option>
              {scheduleData?.exam_rooms?.map((room: any, index: number) => (
                <option key={index} value={room.room.name}>
                  {room.room.name} ({room.camera_urls.length} cameras)
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Mode */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("all-grid")}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                viewMode === "all-grid"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="All Cameras Grid"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("room-by-room")}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                viewMode === "room-by-room"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Room by Room"
            >
              <Rows3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("single-focus")}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                viewMode === "single-focus"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Single Focus"
            >
              <Square className="h-4 w-4" />
            </button>
          </div>

          {/* Grid Layout (only for all-grid mode) */}
          {viewMode === "all-grid" && (
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {(["2x2", "3x3", "4x4", "adaptive"] as GridLayout[]).map(
                (layout) => (
                  <button
                    key={layout}
                    onClick={() => setGridLayout(layout)}
                    className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
                      gridLayout === layout
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {layout.toUpperCase()}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAlertsPanelOpen(!alertsPanelOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:scale-105 ${
              alertsPanelOpen
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {alertsPanelOpen ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlsBar;
