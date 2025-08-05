"use client";

import React, { useState, useEffect, useRef } from "react";
import SchedulesTopBar from "@/components/admin/schedules/SchedulesTopBar";
import Content from "@/components/admin/schedules/Content";
import ManagementLoading from "@/components/academicData/ManagementLoading";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "@/components/Alert";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const SchedulesPage: React.FC = () => {
  const user = useAuth(["admin"]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);

  const fetchSchedules = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/v1/schedule/past/all`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setSchedules(res.data?.past_schedules || []);
    } catch (error: any) {
      setAlertContent({
        variant: "error",
        message:
          error?.response?.data?.detail ||
          "Something went wrong|| Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [user]);

  if (!user || loading) {
    return <ManagementLoading />;
  }

  return (
    <div className="min-h-screen bg-white">
      <SchedulesTopBar callBack={fetchSchedules} title="Past Schedules" />
      <Content schedules={schedules || []} />
      {alertContent && (
        <Alert
          variant={alertContent?.variant}
          message={alertContent?.message}
        />
      )}
    </div>
  );
};

export default SchedulesPage;
