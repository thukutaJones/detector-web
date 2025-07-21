"use client";

import { Users, AlertTriangle, Clock, Target } from "lucide-react";
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
import { stat } from "fs";

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

  //   const stats = [
  //     {
  //       title: "Active Exams",
  //       value: "247",
  //       change: "+12.5%",
  //       changeType: "up",
  //       icon: Clock,
  //       color: "text-emerald-600",
  //       bgGradient: "from-emerald-50 to-emerald-100",
  //       ringColor: "ring-emerald-500/20",
  //       subtext: "18 starting soon",
  //     },
  //     {
  //       title: "Violations Detected",
  //       value: "1,247",
  //       change: "+8.2%",
  //       changeType: "up",
  //       icon: AlertTriangle,
  //       color: "text-amber-600",
  //       bgGradient: "from-amber-50 to-amber-100",
  //       ringColor: "ring-amber-500/20",
  //       subtext: "23 critical alerts",
  //     },
  //     {
  //       title: "System Accuracy",
  //       value: "99.7%",
  //       change: "+2.1%",
  //       changeType: "up",
  //       icon: Target,
  //       color: "text-green-600",
  //       bgGradient: "from-green-50 to-green-100",
  //       ringColor: "ring-green-500/20",
  //       subtext: "AI confidence high",
  //     },
  //     {
  //       title: "Total Users",
  //       value: "12,847",
  //       change: "+15.3%",
  //       changeType: "up",
  //       icon: Users,
  //       color: "text-blue-600",
  //       bgGradient: "from-blue-50 to-blue-100",
  //       ringColor: "ring-blue-500/20",
  //       subtext: "2,341 active now",
  //     },
  //   ];

  const recentActivity = [
    {
      action: "Suspicious head movement detected",
      exam: "Advanced Mathematics Final",
      time: "2 minutes ago",
      severity: "high",
      confidence: "94%",
      user: "Student #4821",
    },
    {
      action: "New invigilator authenticated",
      exam: "Physics Quantum Mechanics",
      time: "15 minutes ago",
      severity: "low",
      confidence: "100%",
      user: "Dr. Sarah Chen",
    },
    {
      action: "Multiple device usage flagged",
      exam: "Organic Chemistry Quiz",
      time: "32 minutes ago",
      severity: "medium",
      confidence: "87%",
      user: "Student #7293",
    },
    {
      action: "Eye tracking anomaly detected",
      exam: "Computer Science Algorithms",
      time: "45 minutes ago",
      severity: "high",
      confidence: "91%",
      user: "Student #1847",
    },
    {
      action: "Exam session completed successfully",
      exam: "English Literature Analysis",
      time: "1 hour ago",
      severity: "low",
      confidence: "100%",
      user: "Prof. Michael Torres",
    },
  ];

  const liveMetrics = [
    {
      label: "Detection Engine",
      value: "99.2%",
      status: "optimal",
      pulse: true,
    },
    {
      label: "Response Time",
      value: "24ms",
      status: "excellent",
      pulse: false,
    },
    { label: "CPU Usage", value: "67%", status: "normal", pulse: false },
    { label: "Memory Usage", value: "45%", status: "optimal", pulse: false },
  ];

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
