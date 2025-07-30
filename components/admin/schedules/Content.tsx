import {
  Building2,
  Calendar,
  Camera,
  ChevronUp,
  Clock,
  Edit3,
  Eye,
  FileSpreadsheet,
  GraduationCap,
  MapPin,
  Plus,
  Shield,
  Trash2,
  Upload,
  Users,
  VideoIcon,
} from "lucide-react";
import React, { useState } from "react";

const Content = ({
  schedules,
  fileInputRef,
  startEdit,
  handleDelete,
}: {
  schedules: any[];
  fileInputRef: any;
  startEdit: any;
  handleDelete: any;
}) => {
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);

  return (
    <div className="relative px-4 py-4 h-[calc(100vh-100px)] overflow-auto scroll-container">
      {schedules.length === 0 ? (
        <div className="text-center py-20">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FileSpreadsheet className="h-12 w-12 text-green-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No schedules found
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Get started by uploading your first Excel schedule file to begin
            monitoring exams
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload Your First Schedule
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {schedules.map((schedule, index) => (
            <div
              key={schedule.id}
              className="group bg-white/70 backdrop-blur-xl rounded-xl shadow overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Schedule Card Header */}
              <div className="p-8 bg-gradient-to-r from-white/50 to-green-50/30 border-b border-gray-100/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 text-lg">
                          {new Date(schedule.date)?.toDateString()}
                        </span>
                        <p className="text-gray-500 text-sm">{schedule.day}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">
                          {schedule.time}
                        </span>
                        <p className="text-gray-500 text-sm">Duration</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">
                          {schedule.rooms.length}
                        </span>
                        <p className="text-gray-500 text-sm">Rooms</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">
                          {schedule.operators.length}
                        </span>
                        <p className="text-gray-500 text-sm">Operators</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setExpandedSchedule(
                          expandedSchedule === schedule.id ? null : schedule.id
                        )
                      }
                      className="p-3 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 group"
                    >
                      {expandedSchedule === schedule.id ? (
                        <ChevronUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                      ) : (
                        <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                      )}
                    </button>
                    <button
                      onClick={() => startEdit(schedule)}
                      className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                    >
                      <Edit3 className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.id)}
                      className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                    >
                      <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Schedule Details */}
              {expandedSchedule === schedule.id && (
                <div className="p-8 bg-gradient-to-br from-gray-50/50 to-white/50 animate-in slide-in-from-top duration-300">
                  {/* Operators */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Users className="h-5 w-5 text-green-600 mr-2" />
                      <h4 className="font-bold text-gray-900 text-lg">
                        Operators ({schedule.operators.length})
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {schedule?.operators?.map(
                        (operator: any, index: number) => (
                          <div
                            key={index?.toString()}
                            className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                          >
                            {operator?.fullName}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Rooms */}
                  <div>
                    <div className="flex items-center mb-6">
                      <Building2 className="h-5 w-5 text-blue-600 mr-2" />
                      <h4 className="font-bold text-gray-900 text-lg">
                        Examination Rooms ({schedule.rooms.length})
                      </h4>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {schedule.rooms.map((room: any, index: number) => (
                        <div
                          key={index?.toString()}
                          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                              <MapPin className="h-4 w-4 text-white" />
                            </div>
                            <h5 className="font-bold text-gray-900">
                              {room.room}
                            </h5>
                          </div>

                          <div className="space-y-4 text-sm">
                            {/* Courses */}
                            <div>
                              <div className="flex items-center mb-2">
                                <GraduationCap className="h-4 w-4 text-purple-500 mr-2" />
                                <span className="font-semibold text-gray-700">
                                  Courses
                                </span>
                              </div>
                              {room.courses.map(
                                (course: any, courseIndex: number) => (
                                  <div
                                    key={courseIndex?.toString()}
                                    className="bg-purple-50 rounded-lg p-3 mb-2"
                                  >
                                    <div className="font-medium text-purple-900">
                                      {course.course_code}
                                    </div>
                                    <div className="text-purple-700 text-xs">
                                      {course.course_name}
                                    </div>
                                    {course.capacity && (
                                      <div className="text-purple-600 text-xs mt-1">
                                        Capacity: {course.capacity}
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>

                            {/* Invigilators */}
                            <div>
                              <div className="flex items-center mb-2">
                                <Shield className="h-4 w-4 text-yellow-500 mr-2" />
                                <span className="font-semibold text-gray-700">
                                  Invigilators ({room.invigilators.length})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {room.invigilators.map((invigilator: any, index: number) => (
                                  <span
                                    key={index?.toString()}
                                    className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium"
                                  >
                                    {invigilator.fullName}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Cameras */}
                            <div>
                              <div className="flex items-center mb-2">
                                <Camera className="h-4 w-4 text-red-500 mr-2" />
                                <span className="font-semibold text-gray-700">
                                  Cameras ({room.camera_urls.length})
                                </span>
                              </div>
                              {room.camera_urls.map((url: any, urlIndex: number) => (
                                <div
                                  key={urlIndex?.toString()}
                                  className="flex items-center bg-red-50 rounded-lg p-2 mb-1"
                                >
                                  <VideoIcon className="h-3 w-3 text-red-500 mr-2 flex-shrink-0" />
                                  <span className="text-red-700 text-xs truncate">
                                    {url}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
