"use client";

import React, { useState, useEffect } from "react";
import { Camera, AlertTriangle, Clock, BookOpen, Bell, X } from "lucide-react";
import OperatorTopBar from "@/components/operator/OperatorTopBar";
import CameraFeed from "@/components/operator/CameraFeed";
import ControlsBar from "@/components/operator/ControlsBar";
import AlertsPanel from "@/components/operator/AlertsPanel";

interface Course {
  name: string;
  id: string;
}

interface Invigilator {
  fullName: string;
  id: string;
  email: string;
  phone: string;
}

interface Room {
  name: string;
  id: string;
}

interface ExamRoom {
  id: string;
  room: Room;
  courses: Course[];
  invigilators: Invigilator[];
  camera_urls: string[];
  start_time: string;
  end_time: string;
  active: boolean;
}

interface Alert {
  id: number;
  type: "warning" | "alert" | "info";
  room: string;
  message: string;
  time: string;
  severity: "high" | "medium" | "low";
}

interface ScheduleData {
  date: string;
  operators: { fullName: string; role: string; status: string }[];
  exam_rooms: ExamRoom[];
}

type ViewMode = "all-grid" | "room-by-room" | "single-focus";
type GridLayout = "2x2" | "3x3" | "4x4" | "1x1" | "adaptive";

const OperatorDashboard: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("all-grid");
  const [gridLayout, setGridLayout] = useState<GridLayout>("adaptive");
  const [alertsPanelOpen, setAlertsPanelOpen] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [focusedCamera, setFocusedCamera] = useState<string | null>(null);

  const [alerts, setAlerts] = useState<Alert[]>([]);

  const scheduleData: ScheduleData = {
    date: "2025-07-21",
    operators: [
      { fullName: "Montego Moth", role: "operator", status: "active" },
      { fullName: "Jones Thukuta", role: "operator", status: "active" },
    ],
    exam_rooms: [
      {
        id: "room1",
        room: { name: "ICT Lab 1", id: "r1" },
        courses: [{ name: "COMM1101", id: "c1" }],
        invigilators: [
          {
            fullName: "David Chimtengo",
            id: "i1",
            email: "david@test.com",
            phone: "0888970051",
          },
          {
            fullName: "Jones Montego",
            id: "i2",
            email: "montego@gmail.com",
            phone: "0888965601",
          },
        ],
        camera_urls: [
          "http://localhost:7000/api/cam/lab1-front",
          "http://localhost:7000/api/cam/lab1-back",
          "http://localhost:7000/api/cam/lab1-side1",
          "http://localhost:7000/api/cam/lab1-side2",
        ],
        start_time: "20:50",
        end_time: "23:50",
        active: true,
      },
      {
        id: "room2",
        room: { name: "Main Lecture Room", id: "r2" },
        courses: [
          { name: "MATH1101", id: "c2" },
          { name: "COMM1101", id: "c1" },
        ],
        invigilators: [
          {
            fullName: "David Chimtengo",
            id: "i1",
            email: "david@test.com",
            phone: "0888970051",
          },
          {
            fullName: "Moth Jones",
            id: "i3",
            email: "mothjones@gmail.com",
            phone: "0888765410",
          },
        ],
        camera_urls: [
          "http://localhost:7000/api/cam/main-front",
          "http://localhost:7000/api/cam/main-back",
          "http://localhost:7000/api/cam/main-overview",
        ],
        start_time: "21:00",
        end_time: "22:45",
        active: true,
      },
      {
        id: "room3",
        room: { name: "Lecture Room 1", id: "r3" },
        courses: [{ name: "PHY1101", id: "c3" }],
        invigilators: [
          {
            fullName: "Moreen Montego",
            id: "i4",
            email: "moreen@test.com",
            phone: "0888965731",
          },
          {
            fullName: "Jones Thukuta",
            id: "i5",
            email: "jonest@gmail.com",
            phone: "0888941800",
          },
        ],
        camera_urls: [
          "http://localhost:7000/api/cam/lec1-front",
          "http://localhost:7000/api/cam/lec1-back",
        ],
        start_time: "21:00",
        end_time: "23:00",
        active: true,
      },
    ],
  };

  const getAllCameras = () => {
    const cameras: {
      url: string;
      roomName: string;
      cameraName: string;
      roomId: string;
      active: boolean;
    }[] = [];
    scheduleData.exam_rooms.forEach((room) => {
      if (selectedRoom === "all" || room.room.name === selectedRoom) {
        room.camera_urls.forEach((url, idx) => {
          const cameraName =
            url.split("/").pop()?.replace("-", " ") || `Camera ${idx + 1}`;
          cameras.push({
            url,
            roomName: room.room.name,
            cameraName:
              cameraName.charAt(0).toUpperCase() + cameraName.slice(1),
            roomId: room.id,
            active: room.active,
          });
        });
      }
    });
    return cameras;
  };

  const getGridCols = (totalCameras: number, layout: GridLayout): string => {
    if (layout === "1x1") return "grid-cols-1";
    if (layout === "2x2") return "grid-cols-2";
    if (layout === "3x3") return "grid-cols-3";
    if (layout === "4x4") return "grid-cols-4";

    if (totalCameras <= 1) return "grid-cols-1";
    if (totalCameras <= 4) return "grid-cols-2";
    if (totalCameras <= 9) return "grid-cols-3";
    return "grid-cols-4";
  };

  const cameras = getAllCameras();
  const filteredRooms =
    selectedRoom === "all"
      ? scheduleData.exam_rooms
      : scheduleData.exam_rooms.filter(
          (room) => room.room.name === selectedRoom
        );

  return (
    <div className="bg-gray-50 flex flex-col h-screen overflow-hidden">
      <OperatorTopBar cameras={cameras} />

      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col h-[calc(100vh-90px)] overflow-auto">
          <ControlsBar
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            cameras={cameras}
            scheduleData={scheduleData}
            setViewMode={setViewMode}
            viewMode={viewMode}
            setGridLayout={setGridLayout}
            gridLayout={gridLayout}
            alertsPanelOpen={alertsPanelOpen}
            setAlertsPanelOpen={setAlertsPanelOpen}
            alerts={alerts}
          />

          <div className="flex-1 p-4 overflow-auto scroll-container">
            {viewMode === "all-grid" && (
              <div
                className={`grid gap-2 ${getGridCols(
                  cameras.length,
                  gridLayout
                )}`}
              >
                {cameras.map((camera, idx) => (
                  <CameraFeed
                    key={`${camera.roomId}-${idx}`}
                    url={camera.url}
                    roomName={camera.roomName}
                    isActive={camera.active}
                    onFocus={() => {
                      setFocusedCamera(`${camera.roomId}-${idx}`);
                      setViewMode("single-focus");
                    }}
                  />
                ))}
              </div>
            )}

            {viewMode === "room-by-room" && (
              <div className="space-y-6">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {room.room.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {room.start_time} - {room.end_time}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {room.courses.map((c) => c.name).join(", ")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Camera className="h-4 w-4" />
                              {room.camera_urls.length} cameras
                            </span>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            room.active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {room.active ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {room.camera_urls.map((url, idx) => {
                          const cameraName =
                            url.split("/").pop()?.replace("-", " ") ||
                            `Camera ${idx + 1}`;
                          return (
                            <CameraFeed
                              key={idx}
                              url={url}
                              roomName={room.room.name}
                              isActive={room.active}
                              onFocus={() => {
                                setFocusedCamera(`${room.id}-${idx}`);
                                setViewMode("single-focus");
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === "single-focus" && focusedCamera && (
              <div className="flex flex-col">
                <div className="flex-1 w-full">
                  {cameras.map((camera, idx) => {
                    const cameraId = `${camera.roomId}-${idx}`;
                    if (cameraId === focusedCamera) {
                      return (
                        <div key={cameraId} className="flex gap-4 w-full">
                          <div className="flex-1">
                            <CameraFeed
                              url={camera.url}
                              roomName={camera.roomName}
                              isActive={camera.active}
                              isFocused={true}
                              onFocus={() => {
                                setFocusedCamera(cameraId);
                                setViewMode("single-focus");
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {alertsPanelOpen && (
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <AlertsPanel
              alertsPanelOpen={alertsPanelOpen}
              alerts={alerts}
              setAlertsPanelOpen={setAlertsPanelOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OperatorDashboard;
