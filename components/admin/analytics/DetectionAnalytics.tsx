import { AlertTriangle, CheckCircle, Eye, Shield, XCircle } from "lucide-react";
import React from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DetectionAnalytics = ({
  StatCard,
  CustomTooltip,
  detectionData,
  detectionPieData,
}: {
  StatCard: any;
  CustomTooltip: any;
  detectionData: any;
  detectionPieData: any;
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
          <Shield className="w-5 h-5 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Detection Analytics
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Detections"
          value="214"
          change="+15.2%"
          icon={Eye}
          trend="up"
          color="bg-yellow-500"
        />
        <StatCard
          title="True Detections"
          value="174"
          change="+18.7%"
          icon={CheckCircle}
          trend="up"
          color="bg-green-500"
        />
        <StatCard
          title="False Detections"
          value="40"
          change="-5.3%"
          icon={XCircle}
          trend="down"
          color="bg-red-500"
        />
        <StatCard
          title="Accuracy Rate"
          value="81.3%"
          change="+3.2%"
          icon={AlertTriangle}
          trend="up"
          color="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detection Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={detectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="trueDetections"
                stroke="#16a34a"
                strokeWidth={3}
                name="True Detections"
              />
              <Line
                type="monotone"
                dataKey="falseDetections"
                stroke="#dc2626"
                strokeWidth={3}
                name="False Detections"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detection Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={detectionPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {detectionPieData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DetectionAnalytics;
