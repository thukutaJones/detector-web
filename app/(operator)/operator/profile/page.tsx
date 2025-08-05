"use client";

import ManagementLoading from "@/components/academicData/ManagementLoading";
import TopBar from "@/components/admin/profile/TopBar";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/formatDatenTime";
import { getInitials } from "@/utils/getInitials";
import axios from "axios";
import { Calendar, CheckCircle, Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const user = useAuth(["operator"]);
  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const getRoleConfig = (role: string) => {
    if (!role) return;
    switch (role) {
      case "admin":
        return {
          color: "from-red-500 to-pink-600",
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
        };
      case "invigilator":
        return {
          color: "from-blue-500 to-cyan-600",
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
        };
      case "operator":
        return {
          color: "from-yellow-500 to-orange-600",
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
        };
      default:
        return {
          color: "from-gray-500 to-gray-600",
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
        };
    }
  };

  const roleConfig = getRoleConfig(userData?.role);

  const fetchUser = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/v1/user/${user?.user?.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUserData(res?.data?.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  if (isLoading || !user) return <ManagementLoading />;
  return (
    <div className="h-screen flex-1 overflow-hidden">
      <TopBar
        handleLogOut={() => {
          localStorage.removeItem("token");
          router.replace("/sign-in");
        }}
      />
      <div className="relative p-8 h-[calc(100vh-80px)] overflow-auto scroll-container bg-white">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8 mb-8">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <span className="text-2xl font-bold text-white">
                {getInitials(userData?.fullName)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {userData?.verifiedEmail && (
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-2xl border-4 border-white flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-green-600 bg-clip-text text-transparent mb-4">
              {userData?.fullName}
            </h2>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mb-6">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-2xl ${roleConfig?.bg} ${roleConfig?.text} ${roleConfig?.border} border backdrop-blur-sm`}
              >
                <div
                  className={`w-4 h-4 bg-gradient-to-r ${roleConfig?.color} rounded-xl flex items-center justify-center mr-3`}
                >
                  <Shield className="w-2 h-2 text-white" />
                </div>
                <span className="font-semibold text-sm">
                  {userData?.role
                    ? userData.role.charAt(0).toUpperCase() +
                      userData.role.slice(1)
                    : ""}
                </span>
              </div>

              <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-green-50 text-green-700 border border-green-200 backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="font-semibold text-sm">Active</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg">
              Last active {formatDate(userData?.lastLogin)}
            </p>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl"></div>
            <div className="relative p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-3">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Contact</h3>
              </div>

              <div className="space-y-4">
                <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900 font-semibold">
                      {userData?.email}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900 font-semibold">
                      {userData?.phone}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-gray-900 font-semibold capitalize">
                      {userData?.gender}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-2xl"></div>
            <div className="relative p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Account</h3>
              </div>

              <div className="space-y-4">
                <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Last Login
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {formatDate(userData?.lastLogin)}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Member Since
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {formatDate(userData?.created)}
                    </p>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Account ID
                    </p>
                    <p className="text-gray-900 font-semibold font-mono">
                      {typeof userData?.id === "string"
                        ? userData.id.slice(-8)
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
