import { getGreeting } from "@/utils/getGreeting";
import { getInitials } from "@/utils/getInitials";
import { Bell, Search } from "lucide-react";
import React, { useState } from "react";

const DashboardTopBar = ({ name }: { name: string }) => {
  const [notifications, setNotifications] = useState<number | string>(0);

  return (
    <header className="bg-white/80 backdrop-blur-xl px-8 py-6 h-[100px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {getGreeting()}, {name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-300"
              />
            </div>
            <button className="p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-300 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {notifications}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300">
              <span className="text-white text-sm font-bold">{getInitials(name)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopBar;
