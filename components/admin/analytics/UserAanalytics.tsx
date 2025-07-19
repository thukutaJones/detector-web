import { Activity, TrendingUp, Users } from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const UserAanalytics = ({
  StatCard,
  CustomTooltip,
  userAnalyticsData,
}: {
  StatCard: any;
  CustomTooltip: any;
  userAnalyticsData: any;
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">User Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Active Users"
          value="68"
          change="+12.5%"
          icon={Users}
          trend="up"
          color="bg-blue-500"
        />
        <StatCard
          title="New Users"
          value="89"
          change="+23.1%"
          icon={TrendingUp}
          trend="up"
          color="bg-green-500"
        />
        <StatCard
          title="Total Logins"
          value="1,558"
          change="+8.3%"
          icon={Activity}
          trend="up"
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          User Activity Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userAnalyticsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Area
              type="monotone"
              dataKey="activeUsers"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
              name="Active Users"
            />
            <Area
              type="monotone"
              dataKey="newUsers"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
              name="New Users"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserAanalytics;
