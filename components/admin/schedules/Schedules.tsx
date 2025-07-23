import { formatDate, formatTime } from "@/utils/formatDatenTime";
import {
  BookOpen,
  ChevronDown,
  Clock,
  MapPin,
  Plus,
  User,
  Users,
  Video,
} from "lucide-react";
import React from "react";

const Schedules = ({
  schedules = [],
  setShowExamRoomModal,
  setSelectedSchedule,
  setExpandedSchedule,
  expandedSchedule,
}: {
  schedules: any;
  setShowExamRoomModal: any;
  setSelectedSchedule: any;
  setExpandedSchedule: any;
  expandedSchedule: any;
}) => {
  return (
    <div className="grid gap-4">
      {schedules?.map((schedule: any, index: number) => (
        <div
          key={index?.toString()}
          className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          {/* Schedule Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">
                  {formatDate(schedule?.date)}
                </h3>
                <div className="flex items-center gap-6 text-green-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium text-sm">
                      {schedule?.operators?.length} Operators
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium text-sm">
                      {schedule?.exam_rooms?.length} Exam Rooms
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedSchedule(schedule);
                    setShowExamRoomModal(true);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 text-sm rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Room
                </button>
                <button
                  onClick={() =>
                    setExpandedSchedule(
                      expandedSchedule === schedule?.id ? null : schedule?.id
                    )
                  }
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-all duration-200"
                >
                  <ChevronDown
                    className={`w-6 h-6 transition-transform duration-200 ${
                      expandedSchedule === schedule?.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Schedule Details */}
          {expandedSchedule === schedule?.id && (
            <div className="p-8 space-y-8">
              {/* Operators Section */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Assigned Operators
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schedule?.operators?.map((operator: any, i: number) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900">
                            {operator?.fullName}
                          </h5>
                          <p className="text-xs text-gray-600">
                            {operator?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Rooms Section */}
              {schedule?.exam_rooms?.length > 0 && (
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-green-600" />
                    Exam Rooms
                  </h4>
                  <div className="grid gap-6">
                    {schedule?.exam_rooms?.map((room: any, index: number) => (
                      <div
                        key={room?.id}
                        className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
                      >
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {/* Room & Time */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-green-600">
                              <MapPin className="w-5 h-5" />
                              <span className="font-semibold text-gray-900">
                                {room?.room?.name || room?.room_id}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">
                                {formatTime(room?.start_time)} -{" "}
                                {formatTime(room?.end_time)}
                              </span>
                            </div>
                          </div>

                          {/* Courses */}
                          <div>
                            <div className="flex items-center gap-2 text-gray-700 mb-2">
                              <BookOpen className="w-4 h-4" />
                              <span className="font-medium text-sm">
                                Courses
                              </span>
                            </div>
                            <div className="space-y-1">
                              {room?.courses?.map((course: any, i: number) => (
                                <div
                                  key={i}
                                  className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-sm font-medium"
                                >
                                  {course?.name}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Invigilators */}
                          <div>
                            <div className="flex items-center gap-2 text-gray-700 mb-2">
                              <Users className="w-4 h-4" />
                              <span className="font-medium text-sm">
                                Invigilators
                              </span>
                            </div>
                            <div className="space-y-1">
                              {room?.invigilators?.map((i: any) => (
                                <div
                                  key={i?.id}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                                    <User className="w-3 h-3 text-blue-600" />
                                  </div>
                                  <span className="text-sm text-gray-700">
                                    {i?.fullName}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Cameras */}
                          <div>
                            <div className="flex items-center gap-2 text-gray-700 mb-2">
                              <Video className="w-4 h-4" />
                              <span className="font-medium text-sm">
                                Cameras ({room?.camera_urls?.length})
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {room?.camera_urls?.length} camera
                              {room?.camera_urls?.length !== 1 ? "s" : ""}{" "}
                              configured
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Schedules;
