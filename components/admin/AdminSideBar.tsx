"use client";

import React, { useState } from "react";
import {
  Shield,
  Users,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Eye,
  Activity,
  FileText,
  Home,
  UserCheck,
  Info,
  Mail,
  User,
  TrendingUp,
  Zap,
} from "lucide-react";
import Image from "next/image";

type MenuKey = "userManagement" | "analytics" | "systemData";

const AdminSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<Record<MenuKey, boolean>>({
    userManagement: true,
    analytics: false,
    systemData: false,
  });

  const toggleMenu = (menu: MenuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    {
      key: "userManagement",
      title: "User Management",
      icon: Users,
      gradient: "from-blue-500 to-purple-600",
      children: [
        { title: "Admins", icon: Shield, count: 12, status: "active", trend: "+2" },
        { title: "Operators", icon: User, count: 34, status: "active", trend: "+5" },
        { title: "Invigilators", icon: Eye, count: 156, status: "active", trend: "+12" },
      ],
    },
    {
      key: "analytics",
      title: "Analytics",
      icon: BarChart3,
      gradient: "from-green-500 to-teal-600",
      children: [
        { title: "User Analytics", icon: TrendingUp, badge: "New" },
        { title: "Detection Performance", icon: Activity, badge: "Live" },
        { title: "Exam Analytics", icon: FileText, badge: "Updated" },
      ],
    },
    {
      key: "systemData",
      title: "Content Management",
      icon: FileText,
      gradient: "from-orange-500 to-red-600",
      children: [
        { title: "Homepage Data", icon: Home },
        { title: "Our Team Data", icon: UserCheck },
        { title: "About Us Data", icon: Info },
        { title: "Contact Us Data", icon: Mail },
      ],
    },
  ] as const;

  return (
 <div className={`${sidebarOpen ? 'w-72' : 'w-20'} h-screen overflow-y-auto overflow-x-clip bg-white/80 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 transition-all duration-500 ease-in-out flex flex-col`}>      {/* Background Blur Circles */}
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-72" : "w-20"} h-full bg-white/80 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 transition-all duration-500 ease-in-out flex flex-col relative z-10 pointer-events-auto`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100/50">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-4 ${!sidebarOpen && "justify-center"}`}>
              <div className="relative">
                <div className="w-10 h-10 p-1 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Image
                    src="/logoWhite.png"
                    width={200}
                    height={200}
                    alt="logo"
                    className="w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Zap className="w-2 h-2 text-white" />
                </div>
              </div>
              {sidebarOpen && (
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Detector
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Intelligence Dashboard</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-300 group"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="space-y-1">
                <button
                  onClick={() => toggleMenu(item.key)}
                  className={`w-full flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group relative`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center shadow-sm`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {sidebarOpen && (
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        {item.title}
                      </span>
                    )}
                  </div>
                  {sidebarOpen && (
                    expandedMenus[item.key] ? (
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    )
                  )}
                </button>

                {sidebarOpen && expandedMenus[item.key] && (
                  <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <button
                          key={child.title}
                          className="w-full flex items-center justify-between p-3 pl-8 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                        >
                          <div className="flex items-center space-x-3">
                            <ChildIcon className="w-4 h-4 text-gray-500 group-hover:text-green-600" />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">
                              {child.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {child.count !== undefined && (
                              <span className="text-xs bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-2 py-1 rounded-full font-semibold">
                                {child.count}
                              </span>
                            )}
                            {child.badge && (
                              <span className="text-xs bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 px-2 py-1 rounded-full font-semibold">
                                {child.badge}
                              </span>
                            )}
                            {child.trend && (
                              <span className="text-xs text-green-600 font-semibold">{child.trend}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-100/50">
          <button
            className={`w-full flex items-center ${sidebarOpen ? "space-x-4" : "justify-center"} p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group`}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {sidebarOpen && (
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">System Administrator</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
