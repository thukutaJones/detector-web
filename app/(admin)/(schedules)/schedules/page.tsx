"use client";

import React, { useState, useEffect } from "react";

import MngTopBar from "@/components/academicData/MngTopBar";
import EmptyScheduleComponent from "@/components/admin/schedules/EmptyScheduleComponent";
import Schedules from "@/components/admin/schedules/Schedules";
import AddScheduleModal from "@/components/admin/schedules/AddScheduleModal";
import AddExamModal from "@/components/admin/schedules/AddExamModal";
import { useAuth } from "@/hooks/useAuth";
import ManagementLoading from "@/components/academicData/ManagementLoading";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import { Alert } from "@/components/Alert";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

export default function DetectorSchedules() {
  const user = useAuth(["admin"]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showExamRoomModal, setShowExamRoomModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [invigilators, setInvigilators] = useState<any[]>([]);
  const [isFetchingSchedules, setIsfetchingSchdules] = useState<boolean>(false);
  const [isFetchingCourses, setIsfetchingCourses] = useState<boolean>(false);
  const [isFetchingInvigilators, setIsfetchingInvigilators] =
    useState<boolean>(false);
  const [isFetchingRooms, setIsfetchingRooms] = useState<boolean>(false);

  const fetchSchedules = async () => {
    if (!user) return;
    setIsfetchingSchdules(true);
    try {
      const res = await axios.get(`${baseUrl}/schedules`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setSchedules(res.data);
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    } finally {
      setIsfetchingSchdules(false);
    }
  };

  const fetchRooms = async () => {
    if (!user) return;
    setIsfetchingRooms(true);
    try {
      const res = await axios.get(`${baseUrl}/rooms`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setRooms(res.data?.rooms);
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    } finally {
      setIsfetchingRooms(false);
    }
  };

  const fetchCourses = async () => {
    if (!user) return;
    setIsfetchingCourses(true);
    try {
      const res = await axios.get(`${baseUrl}/courses`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setCourses(res.data?.courses);
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    } finally {
      setIsfetchingCourses(false);
    }
  };

  const fetchInvigilators = async () => {
    if (!user) return;
    setIsfetchingInvigilators(true);
    try {
      const res = await axios.get(`${baseUrl}/users/role/invigilator`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setInvigilators(res.data?.users);
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    } finally {
      setIsfetchingInvigilators(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchRooms();
    fetchCourses();
    fetchInvigilators();
  }, [user]);

  if (
    !user ||
    isFetchingSchedules ||
    isFetchingCourses ||
    isFetchingInvigilators ||
    isFetchingRooms
  )
    return <ManagementLoading />;

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <MngTopBar
        setShowAddModal={setShowScheduleModal}
        title="Exam Schedules"
        message="Manage and monitor your examination schedules with precision"
        buttonText="Create Schedule"
      />
      <div className="h-[calc(100vh-100px)] p-8 scroll-container overflow-auto ">
        {!schedules?.length ? (
          <EmptyScheduleComponent setShowScheduleModal={setShowScheduleModal} />
        ) : (
          <Schedules
            schedules={schedules}
            setShowExamRoomModal={setShowExamRoomModal}
            setSelectedSchedule={setSelectedSchedule}
            setExpandedSchedule={setExpandedSchedule}
            expandedSchedule={expandedSchedule}
            // rooms={rooms}
            // courses={courses}
            // invigilators={invigilators}
          />
        )}
      </div>

      {/* Add Schedule Modal */}
      {showScheduleModal && (
        <AddScheduleModal
          setShowScheduleModal={setShowScheduleModal}
          callBack={fetchSchedules}
          handleAlert={(alert: AlertProps) => setAlertContent(alert)}
        />
      )}

      {/* Add Exam Room Modal */}
      {showExamRoomModal && selectedSchedule && (
        <AddExamModal
          setShowExamRoomModal={setShowExamRoomModal}
          callBack={fetchSchedules}
          rooms={rooms}
          courses={courses}
          invigilators={invigilators}
          handleAlert={(alert: AlertProps) => setAlertContent(alert)}
          selectedSchedule={selectedSchedule}
        />
      )}
      {alertContent && (
        <Alert
          message={alertContent?.message}
          variant={alertContent?.variant}
        />
      )}
    </div>
  );
}
