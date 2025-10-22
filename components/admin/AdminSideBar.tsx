"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Users,
  BarChart3,
  Menu,
  FolderSearch,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
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
  BookOpenCheck,
  UserCog,
  Briefcase,
  GraduationCap,
  Book,
  Building2,
  DoorOpen,
  HomeIcon,
  CalendarClock,
  Clock3,
  Folder,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { getInitials } from "@/utils/getInitials";

type MenuKey =
  | "dashboard"
  | "userManagement"
  | "scheduleManagement"
  | "analytics"
  | "systemData"
  | "academicData"
  | "evidences";

const AdminSideBar = () => {
  const user = useAuth(["admin"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState<any>({});

  const [expandedMenus, setExpandedMenus] = useState<Record<MenuKey, boolean>>({
    dashboard: false,
    userManagement: false,
    scheduleManagement: false,
    analytics: false,
    systemData: false,
    academicData: false,
    evidences: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (menu: MenuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: HomeIcon,
      gradient: "from-green-500 to-green-600",
      children: [{ title: "Home", icon: HomeIcon, route: "/admin" }],
    },
    {
      key: "userManagement",
      title: "User Management",
      icon: Users,
      gradient: "from-blue-500 to-purple-600",
      children: [
        { title: "All", icon: Users, route: "/user-management" },
        {
          title: "Admins",
          icon: Shield,
          route: "/user-management?role=admin",
        },
        {
          title: "Operators",
          icon: User,
          route: "/user-management?role=operator",
        },
        {
          title: "Invigilators",
          icon: Eye,
          route: "/user-management?role=invigilator",
        },
      ],
    },
    {
      key: "scheduleManagement",
      title: "Schedules",
      icon: CalendarClock,
      gradient: "from-yellow-500 to-orange-600",
      children: [
        {
          title: "Schedules",
          icon: Clock3,
          route: "/schedules",
        },
        {
          title: "Past Schedules",
          icon: Clock3,
          route: "/past-schedules",
        },
      ],
    },
    {
      key: "analytics",
      title: "Analytics",
      icon: BarChart3,
      gradient: "from-green-500 to-teal-600",
      children: [
        {
          title: "Detection Performance",
          icon: Activity,
          route: "/analytics#detection-performance",
        },
        {
          title: "User Analytics",
          icon: TrendingUp,
          route: "/analytics#user-analytics",
        },
      ],
    },
    {
      key: "evidences",
      title: "Evidences",
      icon: FolderSearch,
      gradient: "from-indigo-500 to-blue-700",
      children: [{ title: "Evidences", icon: Folder, route: "/evidences" }],
    },
    {
      key: "systemData",
      title: "Content Management",
      icon: FileText,
      gradient: "from-orange-500 to-red-600",
      children: [
        {
          title: "Homepage Data",
          icon: Home,
          route: "#",
        },
        {
          title: "Our Team Data",
          icon: UserCheck,
          route: "#",
        },
        {
          title: "About Us Data",
          icon: Info,
          route: "#",
        },
        {
          title: "Contact Us Data",
          icon: Mail,
          route: "#",
        },
      ],
    },
  ] as const;

  const isExpanded = isMobile ? true : !sidebarCollapsed;

  const fetchUser = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`${baseUrl}/api/v1/user/${user?.user?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUserData(res?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <>
      {/* Mobile Hamburger Toggle */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-40 p-2 bg-white rounded-full shadow-lg md:hidden"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative top-0 z-20 left-0 h-full bg-white transition-all duration-500 ease-in-out
          ${
            isMobile
              ? sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
          ${isExpanded ? "w-72" : "w-20"}
          flex flex-col overflow-y-auto overflow-x-clip
        `}
      >
        <div className="flex flex-col h-full relative">
          {/* Header */}
          <div className="p-6 h-[100px]">
            <div className="flex items-center justify-between">
              <div
                className={`flex items-center space-x-4 ${
                  !isExpanded && "justify-center"
                }`}
              >
                <Link
                  href="/admin"
                  className="w-10 h-10 p-1 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <img
                    src="/logoWhite.png"
                    width={200}
                    height={200}
                    alt="logo"
                    className="w-full h-full"
                  />
                </Link>
                {isExpanded && (
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Detector
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">
                      Admin Dashboard
                    </p>
                  </div>
                )}
              </div>

              {/* Collapse Button (desktop only) */}
              {!isMobile && (
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="absolute -right-3 top-16 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scroll-container">
            {menuItems.map((item: any) => {
              const Icon = item.icon;
              const isMenuKey = [
                "dashboard",
                "userManagement",
                "scheduleManagement",
                "analytics",
                "systemData",
                "academicData",
                "evidences"
              ].includes(item.key);
              return (
                <div key={item.key} className="space-y-1">
                  <button
                    onClick={() => isMenuKey && toggleMenu(item.key as MenuKey)}
                    className={`w-full flex items-center ${
                      isExpanded ? "justify-between" : "justify-center"
                    } p-4 rounded-xl hover:bg-gray-100 transition-all duration-300 group`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      {isExpanded && (
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                          {item.title}
                        </span>
                      )}
                    </div>
                    {isExpanded &&
                      isMenuKey &&
                      (expandedMenus[item.key as MenuKey] ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      ))}
                  </button>

                  {isExpanded &&
                    ([
                      "dashboard",
                      "userManagement",
                      "scheduleManagement",
                      "analytics",
                      "systemData",
                      "academicData",
                      "evidences"
                    ].includes(item.key)
                      ? expandedMenus[item.key as MenuKey]
                      : true) && (
                      <div className="ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                        {item.children.map((child: any) => {
                          const ChildIcon = child.icon;
                          return (
                            <Link
                              href={child?.route}
                              key={child.title}
                              className="w-full flex items-center justify-between p-3 pl-8 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
                            >
                              <div className="flex items-center space-x-3">
                                <ChildIcon className="w-4 h-4 text-gray-500 group-hover:text-green-600" />
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">
                                  {child.title}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {child.count !== undefined && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                    {child.count}
                                  </span>
                                )}
                                {child.badge && (
                                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">
                                    {child.badge}
                                  </span>
                                )}
                                {child.trend && (
                                  <span className="text-xs text-green-600 font-semibold">
                                    {child.trend}
                                  </span>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                </div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100/50">
            <Link
              href="/admin/profile"
              className={`w-full flex items-center ${
                isExpanded ? "space-x-4" : "justify-center"
              } p-4 rounded-xl hover:bg-gray-100 transition-all duration-300`}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {getInitials(userData?.fullName)}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              {isExpanded && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {userData?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userData?.role?.toUpperCase()}
                  </p>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
