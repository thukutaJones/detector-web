"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Clock,
  MapPin,
  FileText,
  Filter,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  TooltipProps,
} from "recharts";
import AnalyticsTopBar from "@/components/admin/analytics/AnalyticsTopBar";
import UserAanalytics from "@/components/admin/analytics/UserAanalytics";
import DetectionAnalytics from "@/components/admin/analytics/DetectionAnalytics";
import ExamAnalytics from "@/components/admin/analytics/ExamAnalytics";

type StatCardProps = {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  trend: "up" | "down";
  color: string;
};

const AnalyticsDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Sample data for user analytics
  const userAnalyticsData = [
    { date: "2024-01-10", activeUsers: 45, newUsers: 8, totalLogins: 127 },
    { date: "2024-01-11", activeUsers: 52, newUsers: 12, totalLogins: 143 },
    { date: "2024-01-12", activeUsers: 48, newUsers: 6, totalLogins: 134 },
    { date: "2024-01-13", activeUsers: 58, newUsers: 15, totalLogins: 167 },
    { date: "2024-01-14", activeUsers: 62, newUsers: 9, totalLogins: 189 },
    { date: "2024-01-15", activeUsers: 71, newUsers: 18, totalLogins: 203 },
    { date: "2024-01-16", activeUsers: 68, newUsers: 11, totalLogins: 195 },
  ];

  // Sample data for detection analytics
  const detectionData = [
    {
      date: "2024-01-10",
      totalDetections: 23,
      trueDetections: 18,
      falseDetections: 5,
    },
    {
      date: "2024-01-11",
      totalDetections: 31,
      trueDetections: 24,
      falseDetections: 7,
    },
    {
      date: "2024-01-12",
      totalDetections: 19,
      trueDetections: 16,
      falseDetections: 3,
    },
    {
      date: "2024-01-13",
      totalDetections: 42,
      trueDetections: 35,
      falseDetections: 7,
    },
    {
      date: "2024-01-14",
      totalDetections: 28,
      trueDetections: 22,
      falseDetections: 6,
    },
    {
      date: "2024-01-15",
      totalDetections: 37,
      trueDetections: 31,
      falseDetections: 6,
    },
    {
      date: "2024-01-16",
      totalDetections: 34,
      trueDetections: 28,
      falseDetections: 6,
    },
  ];

  // Sample data for exam analytics by room
  const examsByRoom = [
    { room: "Room A101", exams: 34, capacity: 40, utilization: 85 },
    { room: "Room A102", exams: 28, capacity: 35, utilization: 80 },
    { room: "Room B201", exams: 41, capacity: 45, utilization: 91 },
    { room: "Room B202", exams: 32, capacity: 40, utilization: 80 },
    { room: "Room C301", exams: 25, capacity: 30, utilization: 83 },
    { room: "Room C302", exams: 38, capacity: 40, utilization: 95 },
    { room: "Room D401", exams: 29, capacity: 35, utilization: 83 },
  ];

  // Detection pie chart data
  const detectionPieData = [
    { name: "True Detections", value: 174, color: "#16a34a" },
    { name: "False Detections", value: 40, color: "#dc2626" },
  ];

  // Time series data for exam completion
  const examTimeData = [
    { time: "08:00", completedExams: 5 },
    { time: "09:00", completedExams: 12 },
    { time: "10:00", completedExams: 23 },
    { time: "11:00", completedExams: 34 },
    { time: "12:00", completedExams: 28 },
    { time: "13:00", completedExams: 19 },
    { time: "14:00", completedExams: 31 },
    { time: "15:00", completedExams: 25 },
    { time: "16:00", completedExams: 18 },
    { time: "17:00", completedExams: 8 },
  ];

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
    trend,
    color,
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trend === "up" ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span
          className={`text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">vs last period</span>
      </div>
    </div>
  );

  const CustomTooltip = (props: TooltipProps<any, any>) => {
    const { active, payload, label } = props as any;
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">
            {label ??
              payload[0]?.payload?.date ??
              payload[0]?.payload?.room ??
              payload[0]?.payload?.time}
          </p>
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

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <AnalyticsTopBar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="flex-1 overflow-auto p-8">
        <UserAanalytics
          StatCard={StatCard}
          CustomTooltip={CustomTooltip}
          userAnalyticsData={userAnalyticsData}
        />
        <DetectionAnalytics
          StatCard={StatCard}
          CustomTooltip={CustomTooltip}
          detectionData={detectionData}
          detectionPieData={detectionPieData}
        />
        <ExamAnalytics
          StatCard={StatCard}
          examsByRoom={examsByRoom}
          CustomTooltip={CustomTooltip}
          examTimeData={examTimeData}
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
