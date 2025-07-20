import FastBouncingDots from "@/components/BouncingAnimation";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { BookOpen, Plus, User, Video, X } from "lucide-react";
import React, { useState } from "react";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const AddExamModal = ({
  setShowExamRoomModal,
  callBack,
  rooms,
  courses,
  invigilators,
  handleAlert,
  selectedSchedule,
}: {
  setShowExamRoomModal: any;
  callBack: any;
  rooms: any;
  courses: any;
  invigilators: any;
  handleAlert: (alert: AlertProps) => void;
  selectedSchedule: any;
}) => {
  const user = useAuth(["admin"]);
  const [examRoomForm, setExamRoomForm] = useState({
    room_id: "",
    course_ids: [] as string[],
    invigilators_ids: [] as string[],
    camera_urls: [] as string[],
    start_time: "",
    end_time: "",
  });
  const [newCameraUrl, setNewCameraUrl] = useState("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const addCameraUrl = () => {
    if (newCameraUrl.trim()) {
      setExamRoomForm((prev) => ({
        ...prev,
        camera_urls: [...prev.camera_urls, newCameraUrl.trim()],
      }));
      setNewCameraUrl("");
    }
  };

  const removeCameraUrl = (index: number) => {
    setExamRoomForm((prev) => ({
      ...prev,
      camera_urls: prev.camera_urls.filter((_, i) => i !== index),
    }));
  };

  const toggleSelection = (
    id: string,
    field: "course_ids" | "invigilators_ids"
  ) => {
    setExamRoomForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((item) => item !== id)
        : [...prev[field], id],
    }));
  };

  const handleAddExamRoom = async (e: any) => {
    e.preventDefault();
    try {
      const payload = {
        room_id: examRoomForm?.room_id,
        schedule_id: selectedSchedule?.id,
        course_ids: examRoomForm?.course_ids,
        invigilators_ids: examRoomForm?.invigilators_ids,
        camera_urls: examRoomForm?.camera_urls,
        start_time: examRoomForm?.start_time,
        end_time: examRoomForm?.end_time,
      };

      await axios.post(`${baseUrl}/exam_rooms`, payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      await callBack();
      setShowExamRoomModal(false);
    } catch (error: any) {
      handleAlert({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleAddExamRoom}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-b from-green-600 via-green-500 to-transparent px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Add Exam Room</h2>
            <button
              type="button"
              onClick={() => setShowExamRoomModal(false)}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8 overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Room Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room
                </label>
                <select
                  value={examRoomForm.room_id}
                  onChange={(e) =>
                    setExamRoomForm((prev) => ({
                      ...prev,
                      room_id: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a room</option>
                  {rooms.map((room: any, index: number) => (
                    <option key={index?.toString()} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={examRoomForm.start_time}
                    onChange={(e) =>
                      setExamRoomForm((prev) => ({
                        ...prev,
                        start_time: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={examRoomForm.end_time}
                    onChange={(e) =>
                      setExamRoomForm((prev) => ({
                        ...prev,
                        end_time: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Camera URLs */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Camera URLs
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    value={newCameraUrl}
                    onChange={(e) => setNewCameraUrl(e.target.value)}
                    placeholder="Enter camera URL"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={addCameraUrl}
                    className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {examRoomForm.camera_urls.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-50 rounded-lg p-3"
                    >
                      <Video className="w-4 h-4 text-gray-600" />
                      <span className="flex-1 text-sm text-gray-700 truncate">
                        {url}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCameraUrl(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Courses */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Courses
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {courses.map((course: any, index: number) => (
                    <label
                      key={index?.toString()}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        examRoomForm.course_ids.includes(course.id)
                          ? "bg-yellow-100 border border-yellow-300"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={examRoomForm.course_ids.includes(course.id)}
                        onChange={() =>
                          toggleSelection(course.id, "course_ids")
                        }
                        className="w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                      />
                      <BookOpen className="w-4 h-4 text-yellow-600" />
                      <span className="text-gray-900 font-medium">
                        {course.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Invigilators */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Invigilators
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {invigilators.map((invigilator: any, index: number) => (
                    <label
                      key={index.toString()}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        examRoomForm.invigilators_ids.includes(invigilator.id)
                          ? "bg-blue-100 border border-blue-300"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={examRoomForm.invigilators_ids.includes(
                          invigilator.id
                        )}
                        onChange={() =>
                          toggleSelection(invigilator.id, "invigilators_ids")
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">
                          {invigilator.fullName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {invigilator.email}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end space-x-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowExamRoomModal(false)}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              !examRoomForm.room_id ||
              !examRoomForm.start_time ||
              !examRoomForm.end_time ||
              isAdding
            }
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? <FastBouncingDots /> : <p>Add Exam Room</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExamModal;
