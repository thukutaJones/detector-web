import {
  Users,
  UserCheck,
  UserX,
  Activity,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import React from "react";

const StatsGrid = ({ stats }: { stats: any }) => {
  const formattedStats = [
    {
      title: "Total Users",
      value: stats.total_users,
      subtext: "All registered users",
      icon: Users,
      changeType: "up",
      change: "+0%",
      bgGradient: "from-purple-400 to-purple-600",
      color: "text-purple-700",
      ringColor: "ring-purple-200",
    },
    {
      title: "Active Users",
      value: stats.active_users,
      subtext: "Users active recently",
      icon: UserCheck,
      changeType: stats.active_users > 0 ? "up" : "down",
      change: stats.active_users > 0 ? "+100%" : "-100%",
      bgGradient: "from-green-400 to-green-600",
      color: "text-green-700",
      ringColor: "ring-green-200",
    },
    {
      title: "Inactive Users",
      value: stats.inactive_users,
      subtext: "Users not active",
      icon: UserX,
      changeType: stats.inactive_users > 0 ? "up" : "down",
      change: stats.inactive_users > 0 ? "+100%" : "-100%",
      bgGradient: "from-red-400 to-red-600",
      color: "text-red-700",
      ringColor: "ring-red-200",
    },
    {
      title: "Prediction Accuracy",
      value: stats.prediction_accuracy,
      subtext: "From latest model",
      icon: Activity,
      changeType: stats.prediction_accuracy !== "--" ? "up" : "down",
      change: "0%",
      bgGradient: "from-blue-400 to-blue-600",
      color: "text-blue-700",
      ringColor: "ring-blue-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {formattedStats.map((stat, index) => (
        <div key={index} className="group relative">
          {/* Hover glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Card content */}
          <div
            className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 ring-1 ${stat.ringColor} group-hover:scale-105`}
          >
            {/* Top row: icon and change */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${stat.bgGradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition duration-300`}
              >
                <stat.icon className="w-6 h-6 text-white opacity-90" />
              </div>
              <div className="flex items-center space-x-2">
                {stat.changeType === "up" ? (
                  <ArrowUp className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-600" />
                )}
                <span
                  className={`text-sm font-bold ${
                    stat.changeType === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>

            {/* Main content */}
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {stat.value || "--"}
            </h3>
            <p className="text-sm text-gray-600 font-medium mb-2">
              {stat.title}
            </p>
            <p className="text-xs text-gray-500">{stat.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
