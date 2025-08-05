"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Eye,
  Calendar,
  Clock,
  MapPin,
  User,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import ManagementLoading from "@/components/academicData/ManagementLoading";
import axios from "axios";
import { Alert } from "@/components/Alert";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const EvidencePage = () => {
  const user = useAuth(["admin"]);
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedEvidence, setSelectedEvidence] = useState<any | null>(null);
  const [evidenceData, setEvidenceData] = useState<any[]>([]);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const availableDates: string[] = useMemo(() => {
    const dates = evidenceData.map((item: any) => item.schedule.date);
    return [...new Set(dates)].sort();
  }, []);

  const getStatusBadge = (status: string, decision: string) => {
    if (status === "reviewed") {
      return decision === "normal" ? (
        <span className="px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
          Normal
        </span>
      ) : (
        <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-full text-sm font-medium border border-red-200">
          Cheating
        </span>
      );
    }
    return (
      <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 rounded-full text-sm font-medium border border-yellow-200">
        Pending Review
      </span>
    );
  };

  const formatTimestamp = (timestamp: string): string => {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const hour = timestamp.substring(9, 11);
    const minute = timestamp.substring(11, 13);
    const second = timestamp.substring(13, 15);

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const filteredEvidence: any[] = evidenceData.filter((item: any) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate =
      selectedDate === "all" || item.schedule.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  const fetchCheatingAlerts = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/v1/alert/cheating/all`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setEvidenceData(res.data?.alerts);
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCheatingAlerts();
  }, [user]);

  if (!user || isLoading) return <ManagementLoading />;

  return (
    <div className="h-screen overflow-hidden flex-1">
      <div className="mb-4 h-[80px] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Evidences</h1>
            <p className="text-gray-600 text-sm">
              AI-Powered Exam Integrity Monitoring System
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-[calc(100vh-80px)] pb-10 overflow-auto scroll-container px-6 w-full">
        {/* Enhanced Filters and Search */}
        <div className="bg-white sticky top-0 z-10 rounded-xl shadow p-4 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search evidence, rooms, or messages..."
                className="pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full bg-gray-50 focus:bg-white transition-all"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Filter by Date:</span>
              </div>
              <div className="relative">
                <select
                  className="appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 hover:bg-white transition"
                  value={selectedDate}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedDate(e.target.value)
                  }
                >
                  <option value="all">All Dates</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Evidence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-10">
          {filteredEvidence.map((item: any, index: number) => (
            <div
              key={index?.toString()}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              {/* Thumbnail with status badge */}
              <div className="relative aspect-video bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <img src={`${baseUrl}${item?.evidence}`} />
                </div>
              </div>

              <div className="p-4 space-y-3">
                {/* Title & Status */}
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {item.title}
                  </h3>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item?.message}
                </p>

                {/* Meta */}
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {formatTimestamp(item?.timestamp)}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {item?.room}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {item?.schedule?.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    {item?.schedule?.operators?.length} operator(s)
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedEvidence(item)}
                    className="text-sm text-green-600 hover:underline font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvidence.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Eye className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No evidence found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Try adjusting your search terms or selecting a different date to
              view evidence.
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Detail Modal */}
      {selectedEvidence && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full h-[90vh] scroll-container  overflow-y-hidden shadow-2xl">
            <div className="p-8 h-full">
              <div className="flex justify-between items-start h-[60px]">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {selectedEvidence?.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {selectedEvidence?.message}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEvidence(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2 h-[calc(90vh-60px)] pb-20 overflow-y-auto scroll-container">
                <img src={`${baseUrl}${selectedEvidence?.evidence}`} />

                <div className="bg-gray-50 rounded-2xl p-6 mt-4">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-4 block">
                    Operators on Duty
                  </label>
                  <div className="space-y-3">
                    {selectedEvidence?.schedule?.operators?.map(
                      (operator: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <div>
                            <p className="font-bold text-gray-900">
                              {operator?.fullName}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {operator?.email}
                            </p>
                          </div>
                          <span className="px-3 py-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl text-sm font-medium border border-green-200">
                            {operator?.status}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {alertContent && (
        <Alert
          variant={alertContent?.variant}
          message={alertContent?.message}
        />
      )}
    </div>
  );
};

export default EvidencePage;
