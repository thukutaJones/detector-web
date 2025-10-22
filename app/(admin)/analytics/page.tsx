"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Users,
  AlertTriangle,
  Eye,
  Activity,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import ManagementLoading from "@/components/academicData/ManagementLoading";
import axios from "axios";
import FastBouncingDots from "@/components/BouncingAnimation";
import Templates from "@/constants/pdfTemplates";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: string;
  verifiedEmail: boolean;
  lastLogin: string | null;
  created: string;
}

interface Alert {
  id: string;
  method: string;
  evidence: string;
  frames: string[];
  timestamp: string;
  title: string;
  message: string;
  schedule: string;
  created_at: string;
  status: string;
  decision: string;
  room: string;
}

const DetectionTrendsCard = ({ analytics, CustomTooltip }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.015 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="relative rounded-3xl bg-white border border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_40px_rgba(0,0,0,0.06)] p-6 overflow-hidden group"
  >
    {/* Soft Glow on Hover */}
    <div className="absolute -inset-1 bg-gradient-to-br from-green-100 via-yellow-50 to-transparent blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-0 pointer-events-none rounded-3xl" />

    {/* Light Shine Layer */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-20 pointer-events-none z-0 rounded-3xl" />

    <div className="relative z-10">
      <h3 className="text-sm font-semibold text-gray-900 mb-6 tracking-tight">
        Detection Trends
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={analytics.detectionData}>
          <defs>
            <linearGradient id="colorTrue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorFalse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#9ca3af"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{
              outline: "none",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))",
            }}
          />

          <Line
            type="monotone"
            dataKey="trueDetections"
            stroke="#22c55e"
            strokeWidth={3}
            name="True Detections"
            dot={{
              r: 4,
              strokeWidth: 2,
              stroke: "#16a34a",
              fill: "#22c55e",
              className: "transition-all duration-300 hover:scale-125",
            }}
            activeDot={{ r: 6 }}
            fill="url(#colorTrue)"
            fillOpacity={1}
          />
          <Line
            type="monotone"
            dataKey="falseDetections"
            stroke="#ef4444"
            strokeWidth={3}
            name="False Detections"
            dot={{
              r: 4,
              strokeWidth: 2,
              stroke: "#dc2626",
              fill: "#ef4444",
              className: "transition-all duration-300 hover:scale-125",
            }}
            activeDot={{ r: 6 }}
            fill="url(#colorFalse)"
            fillOpacity={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

const DetectionDistribution = ({ analytics }: { analytics: any }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h3 className="text-sm font-bold text-gray-800 mb-6">
      Detection Distribution
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={analytics.detectionPieData}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={4}
          dataKey="value"
          isAnimationActive={true}
          stroke="#f9fafb"
          strokeWidth={2}
        >
          {analytics.detectionPieData.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderColor: "#e5e7eb",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          formatter={(value: any) => (
            <span className="text-sm text-gray-700">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const StatCard = ({ title, value, change, icon: Icon, trend, color }: any) => {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500";
  const trendBg = trend === "up" ? "bg-green-100" : "bg-red-100";

  return (
    <motion.div
      whileHover={{ scale: 1.025, rotateX: 2, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="relative group bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg overflow-hidden transition-all duration-300"
    >
      {/* Soft glow ring */}
      <div className="absolute -inset-1 z-0 bg-gradient-to-br from-white/10 via-transparent to-green-200 opacity-5 rounded-3xl blur-xl pointer-events-none" />

      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-5 pointer-events-none z-0" />

      <div className="relative z-10 p-6 flex justify-between items-center">
        {/* Stat text */}
        <div className="space-y-2">
          <p className="text-sm text-black font-semibold">{title}</p>
          <motion.h3
            className="text-4xl font-bold text-gray-600"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {value}
          </motion.h3>

          {change && (
            <div
              className={`inline-flex items-center gap-1 text-sm font-semibold ${trendColor}`}
            >
              <TrendIcon className="w-4 h-4 animate-pulse" />
              <span>{change}</span>
            </div>
          )}
        </div>

        {/* Icon with glow frame */}
        <div
          className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-md transform group-hover:scale-105 transition duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const DetectorAnalytics: React.FC = () => {
  const user = useAuth(["admin"]);
  const [users, setUsers] = useState<User[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState<string>("all");
  const [selectedRoom, setSelectedRoom] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const [usersRes, alertsRes] = await Promise.all([
          axios.get(`${baseUrl}/api/v1/user`, {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }),
          axios(`${baseUrl}/api/v1/alert`, {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }),
        ]);

        setUsers(usersRes?.data?.users || []);
        setAlerts(alertsRes.data?.alerts || []);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const generatePdf = async () => {
    setIsGenerating(true);
    try {
      const token: string = localStorage.getItem("token") || "";
      const templates = await Templates(analytics, alerts, "analytics");
      const htmlContent = templates;

      const response = await axios.post(
        "/api/generate-pdf",
        { htmlContent },
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `detector_report_${new Date().toISOString()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log("Error exporting report");
      }
    } catch (error) {
      console.log(error);
      console.log("Error exporting report");
    } finally {
      setIsGenerating(false);
    }
  };

  // Filtered data based on selections
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      if (selectedSchedule !== "all" && alert.schedule !== selectedSchedule)
        return false;
      if (selectedRoom !== "all" && alert.room !== selectedRoom) return false;
      if (selectedStatus !== "all" && alert.status !== selectedStatus)
        return false;

      if (dateRange !== "all") {
        const alertDate = new Date(alert.created_at);
        const now = new Date();
        const daysDiff = Math.floor(
          (now.getTime() - alertDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        switch (dateRange) {
          case "7d":
            if (daysDiff > 7) return false;
            break;
          case "30d":
            if (daysDiff > 30) return false;
            break;
          case "90d":
            if (daysDiff > 90) return false;
            break;
        }
      }

      return true;
    });
  }, [alerts, selectedSchedule, selectedRoom, selectedStatus, dateRange]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalAlerts = filteredAlerts?.length;
    const cheatingDetected = filteredAlerts.filter(
      (a) => a?.decision === "cheating"
    ).length;
    const normalBehavior = filteredAlerts.filter(
      (a) => a?.decision === "normal"
    ).length;
    const pendingReview = filteredAlerts.filter(
      (a) => a?.status === "not_reviewed"
    ).length;
    const reviewedAlerts = filteredAlerts.filter(
      (a) => a?.status === "reviewed"
    ).length;
    const detectionAccuracy =
      totalAlerts > 0
        ? ((cheatingDetected / reviewedAlerts) * 100).toFixed(1)
        : "0";

    const dailyActivity = filteredAlerts.reduce((acc, alert) => {
      const date = new Date(alert.created_at).toISOString().split("T")[0];
      if (!acc[date])
        acc[date] = { total: 0, trueDetections: 0, falseDetections: 0 };
      acc[date].total++;
      if (alert.decision === "cheating") acc[date].trueDetections++;
      if (alert.decision === "normal") acc[date].falseDetections++;
      return acc;
    }, {} as Record<string, { total: number; trueDetections: number; falseDetections: number }>);

    const detectionData = Object.entries(dailyActivity)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([date, data]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        trueDetections: data.trueDetections,
        falseDetections: data.falseDetections,
        total: data.total,
      }));

    const detectionPieData = [
      { name: "True Detections", value: cheatingDetected, color: "#16a34a" },
      { name: "False Detections", value: normalBehavior, color: "#dc2626" },
      { name: "Pending Review", value: pendingReview, color: "#f59e0b" },
    ];

    const activeUsers = users.filter((u) => u.status === "active").length;
    const inactiveUsers = users.filter((u) => u.status === "inactive").length;
    const verifiedUsers = users.filter((u) => u.verifiedEmail).length;

    return {
      totalAlerts,
      cheatingDetected,
      normalBehavior,
      pendingReview,
      reviewedAlerts,
      detectionAccuracy,
      detectionData,
      detectionPieData,
      activeUsers,
      inactiveUsers,
      verifiedUsers,
    };
  }, [filteredAlerts, users]);

  if (loading || !user) return <ManagementLoading />;

  return (
    <div className="h-screen overflow-hidden flex-1">
      <div className="w-full mx-auto h-screen">
        {/* Header */}
        <div className="mb-8 h-[80px] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 text-sm">
                AI-Powered Exam Integrity Monitoring System
              </p>
            </div>
            <div>
              
            </div>
            <button
              className="px-10 py-2 rounded-full bg-green-600 hover:scale-105"
              onClick={generatePdf}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <FastBouncingDots />
              ) : (
                <p className="text-white text-sm font-bold">Export as PDF</p>
              )}
            </button>
          </div>
        </div>
        <div
          className="h-[calc(100vh-80px)] pb-10 overflow-auto scroll-container px-6 w-full"
          id="detection-performance"
        >
          {/* Detection Analytics */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Detection Analytics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <StatCard
                title="Reviewed Detections"
                value={analytics?.reviewedAlerts}
                change="+15.2%"
                icon={Eye}
                trend="up"
                color="bg-yellow-500"
              />
              <StatCard
                title="True Detections"
                value={analytics.cheatingDetected}
                change="+18.7%"
                icon={CheckCircle}
                trend="up"
                color="bg-green-500"
              />
              <StatCard
                title="False Detections"
                value={analytics.normalBehavior}
                change="-5.3%"
                icon={XCircle}
                trend="down"
                color="bg-red-500"
              />
              <StatCard
                title="Accuracy Rate"
                value={`${analytics.detectionAccuracy}%`}
                change="+3.2%"
                icon={AlertTriangle}
                trend="up"
                color="bg-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DetectionTrendsCard
                analytics={analytics}
                CustomTooltip={CustomTooltip}
              />

              <DetectionDistribution analytics={analytics} />
            </div>
          </div>

          {/* User Analytics */}
          <div className="mb-8" id="user-analytics">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                User Analytics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard
                title="Active Users"
                value={analytics?.activeUsers}
                change="+12.5%"
                icon={Users}
                trend="up"
                color="bg-blue-500"
              />
              <StatCard
                title="Verified Users"
                value={analytics?.verifiedUsers}
                change="+23.1%"
                icon={CheckCircle}
                trend="up"
                color="bg-green-500"
              />
              <StatCard
                title="Total Users"
                value={users?.length}
                change="+8.3%"
                icon={Activity}
                trend="up"
                color="bg-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectorAnalytics;
