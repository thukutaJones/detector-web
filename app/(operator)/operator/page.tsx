"use client";

import React, { useState, useEffect, useRef } from "react";
import { Camera, AlertTriangle, Clock, BookOpen, Bell, X } from "lucide-react";
import OperatorTopBar from "@/components/operator/OperatorTopBar";
import CameraFeed from "@/components/operator/CameraFeed";
import ControlsBar from "@/components/operator/ControlsBar";
import AlertsPanel from "@/components/operator/AlertsPanel";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import ManagementLoading from "@/components/academicData/ManagementLoading";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { Alert } from "@/components/Alert";
import { io } from "socket.io-client";

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
  operators: any[];
  rooms: any[];
  day: string;
  time: string;
  id: string;
}

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

type ViewMode = "all-grid" | "room-by-room" | "single-focus";
type GridLayout = "2x2" | "3x3" | "4x4" | "1x1" | "adaptive";

const OperatorDashboard: React.FC = () => {
  const user = useAuth(["operator"]);
  const [selectedRoom, setSelectedRoom] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("all-grid");
  const [gridLayout, setGridLayout] = useState<GridLayout>("adaptive");
  const [alertsPanelOpen, setAlertsPanelOpen] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [focusedCamera, setFocusedCamera] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isFetchingAlerts, setIsFetchingAlerts] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    date: "",
    operators: [],
    rooms: [],
    day: "",
    time: "",
    id: "",
  });

  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io(baseUrl, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
    });
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchAlerts = async () => {
    if (!user || !scheduleData?.id) return;
    try {
      const res = await axios.get(
        `${baseUrl}/api/v1/alert/schedule-alerts/${scheduleData?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setAlerts(res.data?.alerts);
    } catch (error: any) {
      console.error("Error fetching schedule data:", error);
      setAlertContent({
        variant: "error",
        message: error?.response?.data?.detail || "Something went wrong!",
      });
    } finally {
      setIsFetchingAlerts(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [user, scheduleData]);

  const getAllCameras = () => {
    const cameras: {
      url: string;
      roomName: string;
      cameraName: string;
      roomId: string;
      active: boolean;
    }[] = [];
    scheduleData?.rooms.forEach((room: any) => {
      if (selectedRoom === "all" || room?.room === selectedRoom) {
        room.camera_urls.forEach((url: any, idx: number) => {
          const cameraName =
            url.split("/").pop()?.replace("-", " ") || `Camera ${idx + 1}`;
          cameras.push({
            url,
            roomName: room?.room,
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
      ? scheduleData?.rooms
      : scheduleData?.rooms?.filter(
          (room: any) => room.room.name === selectedRoom
        );

  const fectScheduleData = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${baseUrl}/api/v1/schedule/today/${user?.user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Schedule data fetched:", res.data);
      setScheduleData(
        res.data
          ? res.data?.schedules[0]
          : { date: "", day: "", rooms: [], operators: [] }
      );
    } catch (error: any) {
      console.error("Error fetching schedule data:", error);
      setAlertContent({
        variant: "error",
        message: error?.response?.data?.detail || "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fectScheduleData();
  }, [user]);

  if (!user || isLoading || !socketRef.current) return <ManagementLoading />;

  return (
    <div className="bg-gray-50 flex flex-col h-screen overflow-hidden">
      <OperatorTopBar cameras={cameras} />

      {scheduleData?.date ? (
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
                      schedule_id={scheduleData?.id}
                      isActive={camera.active}
                      socket={socketRef?.current}
                      onFocus={() => {
                        setFocusedCamera(`${camera.roomId}-${idx}`);
                        setViewMode("single-focus");
                      }}
                      setAlerts={setAlerts}
                      handleAlert={(alert: AlertProps) =>
                        setAlertContent(alert)
                      }
                    />
                  ))}
                </div>
              )}

              {viewMode === "room-by-room" && (
                <div className="space-y-6">
                  {filteredRooms.map((room: any, index: number) => (
                    <div
                      key={index?.toString()}
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
                                {scheduleData?.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {room?.courses
                                  ?.map((c: any) => c?.course_code)
                                  .join(", ")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Camera className="h-4 w-4" />
                                {room?.camera_urls?.length} cameras
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              room.camera_urls?.length
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {room.camera_urls?.length ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                          {room.camera_urls.map((url: any, idx: number) => {
                            const cameraName =
                              url.split("/").pop()?.replace("-", " ") ||
                              `Camera ${idx + 1}`;
                            return (
                              <CameraFeed
                                key={idx}
                                url={url}
                                schedule_id={scheduleData?.id}
                                roomName={room?.room?.name}
                                socket={socketRef?.current}
                                isActive={room?.active}
                                onFocus={() => {
                                  setFocusedCamera(`${room?.id}-${idx}`);
                                  setViewMode("single-focus");
                                }}
                                setAlerts={setAlerts}
                                handleAlert={(alert: AlertProps) =>
                                  setAlertContent(alert)
                                }
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
                      const cameraId = `${camera?.roomId}-${idx}`;
                      if (cameraId === focusedCamera) {
                        return (
                          <div key={cameraId} className="flex gap-4 w-full">
                            <div className="flex-1">
                              <CameraFeed
                                url={camera?.url}
                                roomName={camera?.roomName}
                                isActive={camera?.active}
                                schedule_id={scheduleData?.id}
                                isFocused={true}
                                socket={socketRef?.current}
                                onFocus={() => {
                                  setFocusedCamera(cameraId);
                                  setViewMode("single-focus");
                                }}
                                setAlerts={setAlerts}
                                handleAlert={(alert: AlertProps) =>
                                  setAlertContent(alert)
                                }
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
                socket={socketRef?.current}
                alerts={alerts}
                setAlertsPanelOpen={setAlertsPanelOpen}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image src={"/logo.png"} height={200} width={200} alt="Logo" />
          <div className="text-gray-500 text-lg">
            You do not have any exams scheduled today.
          </div>
        </div>
      )}

      {alertContent && (
        <Alert
          variant={alertContent?.variant}
          message={alertContent?.message}
        />
      )}
    </div>
  );
};

export default OperatorDashboard;
