import { BookOpen, MapPin, TrendingUp } from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ExamAnalytics = ({
  StatCard,
  examsByRoom,
  CustomTooltip,
  examTimeData,
}: {
  StatCard: any;
  examsByRoom: any;
  CustomTooltip: any;
  examTimeData: any;
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
          <BookOpen className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Exam Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Exams"
          value="227"
          change="+19.4%"
          icon={BookOpen}
          trend="up"
          color="bg-green-500"
        />
        <StatCard
          title="Active Rooms"
          value="7"
          change="0%"
          icon={MapPin}
          trend="up"
          color="bg-indigo-500"
        />
        <StatCard
          title="Avg. Utilization"
          value="85.3%"
          change="+4.7%"
          icon={TrendingUp}
          trend="up"
          color="bg-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Exams by Room
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={examsByRoom}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="room" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="exams" fill="#16a34a" name="Exams Written" />
              <Bar dataKey="capacity" fill="#e5e7eb" name="Room Capacity" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Exam Completion by Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={examTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="completedExams"
                stroke="#16a34a"
                fill="#16a34a"
                fillOpacity={0.6}
                name="Completed Exams"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Room Utilization Cards */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Room Utilization Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {examsByRoom.map((room: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{room.room}</h4>
                <MapPin className="w-4 h-4 text-gray-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Exams:</span>
                  <span className="font-medium">{room.exams}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{room.capacity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Utilization:</span>
                  <span
                    className={`font-medium ${
                      room.utilization >= 90
                        ? "text-green-600"
                        : room.utilization >= 75
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {room.utilization}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      room.utilization >= 90
                        ? "bg-green-500"
                        : room.utilization >= 75
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${room.utilization}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamAnalytics;
