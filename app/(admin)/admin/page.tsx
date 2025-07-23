"use client";

import DashboardTopBar from "@/components/admin/dashboard/DashboardTopBar";
import StatsGrid from "@/components/admin/dashboard/StatsGrid";
import ContentGrid from "@/components/admin/dashboard/ContentGrid";
import AdvancedPerformanceChart from "@/components/admin/dashboard/AdvancedPerformanceChart";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import ManagementLoading from "@/components/academicData/ManagementLoading";
import { Alert } from "@/components/Alert";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const Dashboard = () => {
  const user = useAuth(["admin"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);
  const [stats, setStats] = useState<any>({});

  const fetchStats = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseUrl}/admin-dashboard/`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setStats(res.data);
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  if (!user || isLoading) return <ManagementLoading />;

  return (
    <div className="flex-1 flex flex-col h-screen">
      <DashboardTopBar />
      <main className="flex-1 overflow-auto bg-transparent">
        <div className="p-8 space-y-8">
          <StatsGrid
            stats={{
              total_users: stats?.total_users,
              active_users: stats?.active_users,
              inactive_users: stats?.inactive_users,
            }}
          />
          <ContentGrid
            liveMetricsData={{
              total_logs: stats?.total_logs,
              info_logs: stats?.info_logs,
              error_logs: stats?.error_logs,
            }}
            logs={stats?.recent_logs || []}
          />
          <AdvancedPerformanceChart />
        </div>
      </main>
      {alertContent && (
        <Alert
          variant={alertContent?.variant}
          message={alertContent?.message}
        />
      )}
    </div>
  );
};

export default Dashboard;
