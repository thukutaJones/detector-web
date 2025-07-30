import FastBouncingDots from "@/components/BouncingAnimation";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Edit3,
  MapPin,
  Plus,
  Save,
  Search,
  Shield,
  Star,
  UserCheck,
  UserPlus,
  Users,
  VideoIcon,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ValidationErrors {
  operators?: string;
  rooms?: {
    [roomIndex: number]: {
      invigilators?: string;
      camera_urls?: string;
    };
  };
}

interface SearchableUserSelectProps {
  users: { id: string; fullName: string; email: string; role: string }[];
  selectedUsers: { id: string }[];
  onAdd: (user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }) => void;
  placeholder: string;
  role?: "operator" | "invigilator";
}

const ValidationMessage: React.FC<{
  message: string;
  type: "error" | "warning" | "success";
}> = ({ message, type }) => {
  const styles = {
    error: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    success: "bg-green-50 text-green-700 border-green-200",
  };

  const icons = {
    error: AlertCircle,
    warning: AlertTriangle,
    success: CheckCircle2,
  };

  const Icon = icons[type];

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg border text-sm ${styles[type]}`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

const SearchableUserSelect: React.FC<SearchableUserSelectProps> = ({
  users,
  selectedUsers,
  onAdd,
  placeholder,
  role,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const availableUsers = users.filter(
    (user) =>
      (!role || user.role === role) &&
      !selectedUsers.some((selected) => selected.id === user.id) &&
      (user.fullName.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch))
  );

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white hover:border-green-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 cursor-pointer transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <Search className="w-4 h-4 text-gray-400" />
          <span className={search ? "text-gray-900" : "text-gray-500"}>
            {search || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto">
            {availableUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No users found</p>
              </div>
            ) : (
              availableUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    onAdd(user); // Pass full user
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {user.fullName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {user.fullName}
                    </div>
                    <div className="text-gray-500 text-xs">{user.email}</div>
                  </div>
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {user.role}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const UserCard: React.FC<{
  user: any;
  onRemove: () => void;
  showRole?: boolean;
  compact?: boolean;
}> = ({ user, onRemove, showRole = false, compact = false }) => {
  return (
    <div
      className={`group flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`${
            compact ? "w-8 h-8" : "w-10 h-10"
          } bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center`}
        >
          <span
            className={`text-white font-semibold ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            {user.fullName
              .split(" ")
              .map((n: any) => n[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>
        <div>
          <div
            className={`font-semibold text-gray-900 ${
              compact ? "text-sm" : ""
            }`}
          >
            {user.fullName}
          </div>
          <div className={`text-gray-500 ${compact ? "text-xs" : "text-sm"}`}>
            {user.email}
            {showRole && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                {user.role}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const CameraUrlManager: React.FC<{
  urls: string[];
  onAdd: (url: string) => void;
  onRemove: (index: number) => void;
  error?: string;
}> = ({ urls, onAdd, onRemove, error }) => {
  const [newUrl, setNewUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return url.includes("http");
    } catch {
      return false;
    }
  };

  const handleAdd = () => {
    if (newUrl.trim() && validateUrl(newUrl.trim())) {
      onAdd(newUrl.trim());
      setNewUrl("");
      setIsValidUrl(true);
    } else {
      setIsValidUrl(false);
    }
  };

  const handleInputChange = (value: string) => {
    setNewUrl(value);
    if (value.trim()) {
      setIsValidUrl(validateUrl(value.trim()));
    } else {
      setIsValidUrl(true);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-3">
        <VideoIcon className="w-4 h-4 text-red-500" />
        <span className="font-semibold text-gray-700">Camera URLs</span>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
          {urls.length}
        </span>
      </div>

      {error && <ValidationMessage message={error} type="error" />}

      <div className="space-y-2">
        {urls.map((url, index) => (
          <div
            key={index}
            className="group flex items-center space-x-3 p-3 bg-red-50 border border-red-100 rounded-lg hover:shadow-sm transition-all duration-200"
          >
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <VideoIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate font-mono">{url}</p>
              <p className="text-xs text-red-600">Active Camera Stream</p>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <div className="flex-1">
          <input
            type="text"
            placeholder="https://camera.example.com/stream"
            value={newUrl}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
              !isValidUrl && newUrl.trim()
                ? "border-red-300 focus:ring-red-500/20 bg-red-50"
                : "border-gray-200 focus:ring-green-500/20 focus:border-green-500"
            }`}
          />
          {!isValidUrl && newUrl.trim() && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Please enter a valid URL starting with http:// or https://
            </p>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={!newUrl.trim() || !isValidUrl}
          className="px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const validateSchedule = (schedule: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate operators
  if (schedule.operators.length === 0) {
    errors.operators = "At least one operator is required";
  }

  // Validate rooms
  errors.rooms = {};
  schedule.rooms.forEach((room: any, index: number) => {
    const roomErrors: { invigilators?: string; cameras?: string } = {};

    if (Object.keys(roomErrors).length > 0) {
      errors.rooms![index] = roomErrors;
    }
  });

  if (Object.keys(errors.rooms).length === 0) {
    delete errors.rooms;
  }

  return errors;
};

const EditModal = ({
  cancelEdit,
  editData,
  setEditData,
  callback,
}: {
  cancelEdit: any;
  editData: any;
  setEditData: any;
  callback: any;
}) => {
  const user = useAuth(["admin"]);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [activeTab, setActiveTab] = useState<"operators" | "rooms">(
    "operators"
  );
  const [operators, setOperators] = useState<any[]>([]);
  const [invigilators, setInvigilators] = useState<any[]>([]);
  const [formError, setFormError] = useState<string>("");
  const [isFetchingStaff, setIsFetchingStaff] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const saveEdit = async () => {
    if (!editData || !editData.id) {
      setFormError("No schedule data to update.");
      return;
    }

    try {
      setIsEditing(true);

      await axios.put(
        `http://localhost:8000/api/v1/schedule/${editData.id}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await callback();
      cancelEdit();
    } catch (error: any) {
      setFormError(
        error?.response?.data?.detail ||
          "Failed to update schedule. Please try again."
      );
    } finally {
      setIsEditing(false);
    }
  };

  const addOperator = (user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  }) => {
    if (!editData) return;
    const exists = editData.operators.some((op: any) => op.id === user.id);
    if (!exists) {
      setEditData({
        ...editData,
        operators: [...editData.operators, user],
      });
    }
  };

  const removeOperator = (userId: string) => {
    if (!editData) return;
    setEditData({
      ...editData,
      operators: editData.operators.filter((op: any) => op.id !== userId),
    });
  };

  const addInvigilator = (
    roomIndex: number,
    user: { id: string; fullName: string; email: string; role: string }
  ) => {
    if (!editData) return;
    const room = editData.rooms[roomIndex];
    const exists = room.invigilators.some((inv: any) => inv.id === user.id);
    if (!exists) {
      const newRooms = [...editData.rooms];
      newRooms[roomIndex] = {
        ...room,
        invigilators: [...room.invigilators, user],
      };
      setEditData({ ...editData, rooms: newRooms });
    }
  };

  const removeInvigilator = (roomIndex: number, userId: string) => {
    if (!editData) return;
    const room = editData.rooms[roomIndex];
    const newRooms = [...editData.rooms];
    newRooms[roomIndex] = {
      ...room,
      invigilators: room.invigilators.filter((inv: any) => inv.id !== userId),
    };
    setEditData({ ...editData, rooms: newRooms });
  };

  const addCameraUrl = (roomIndex: number, url: string) => {
  if (!editData) return;

  const room = editData.rooms[roomIndex];
  const newRooms = [...editData.rooms];
  newRooms[roomIndex] = {
    ...room,
    camera_urls: [...(room.camera_urls ?? []), url],
  };

  const newErrors = { ...validationErrors };
  if (newErrors.rooms?.[roomIndex]?.camera_urls) {
    delete newErrors.rooms[roomIndex].camera_urls;
    if (Object.keys(newErrors.rooms[roomIndex]).length === 0) {
      delete newErrors.rooms[roomIndex];
    }
  }

  setValidationErrors(newErrors);
  setEditData({ ...editData, rooms: newRooms });
};


  const removeCameraUrl = (roomIndex: number, urlIndex: number) => {
    if (!editData) return;

    const room = editData.rooms[roomIndex];
    const newCameras = room.camera_urls.filter(
      (_: any, idx: any) => idx !== urlIndex
    );
    const newRooms = [...editData.rooms];
    newRooms[roomIndex] = {
      ...room,
      camera_urls: newCameras,
    };

    setEditData({ ...editData, rooms: newRooms });
  };

  const fetchStaff = async () => {
    if (!user) return;
    try {
      setIsFetchingStaff(true);
      const res = await axios.get(`${baseUrl}/api/v1/user/staff-members/all`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setOperators(res?.data?.staff_members?.operators);
      setInvigilators(res?.data?.staff_members?.invigilators);
    } catch (error: any) {
      setFormError(
        error?.response?.data?.detail ||
          "Something went wrong!! Please try again!!"
      );
    } finally {
      setIsFetchingStaff(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={cancelEdit}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-b from-green-600 via-green-600 to-transparent p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Edit3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Edit Schedule</h3>
                <p className="text-green-100 text-sm flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{editData.date}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{editData.time}</span>
                </p>
              </div>
            </div>
            <button
              onClick={cancelEdit}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Validation Summary */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-300/30 rounded-xl">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-200" />
                <span className="font-semibold text-red-100">
                  Please fix the following issues:
                </span>
              </div>
              <ul className="mt-2 text-sm text-red-100 space-y-1">
                {validationErrors.operators && (
                  <li>• {validationErrors.operators}</li>
                )}
                {validationErrors.rooms &&
                  Object.entries(validationErrors.rooms).map(
                    ([roomIndex, errors]) =>
                      Object.entries(errors).map(([field, message]) => (
                        <li key={`${roomIndex}-${field}`}>
                          • Room {parseInt(roomIndex) + 1}: {message}
                        </li>
                      ))
                  )}
              </ul>
            </div>
          )}
        </div>

        {formError && (
          <div className="px-4 mt-2">
            <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm">
              <p>{formError}</p>
            </div>
          </div>
        )}
        {/* Tab Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("operators")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                activeTab === "operators"
                  ? "bg-white text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Operators</span>
                {editData.operators.length > 0 && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                    {editData.operators.length}
                  </span>
                )}
                {validationErrors.operators && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                activeTab === "rooms"
                  ? "bg-white text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Rooms</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {editData.rooms.length}
                </span>
                {validationErrors.rooms &&
                  Object.keys(validationErrors.rooms).length > 0 && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
              </div>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[calc(95vh-280px)] overflow-y-auto">
          {activeTab === "operators" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Schedule Operators
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Assign operators to monitor this exam session
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <UserCheck className="w-4 h-4" />
                  <span>{editData.operators.length} assigned</span>
                </div>
              </div>

              {validationErrors.operators && (
                <ValidationMessage
                  message={validationErrors.operators}
                  type="error"
                />
              )}

              {/* Current Operators */}
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-700 flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Assigned Operators</span>
                </h5>
                {editData.operators.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No operators assigned yet</p>
                    <p className="text-gray-400 text-sm">
                      Add operators using the search below
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {editData.operators.map((operator: any) => (
                      <UserCard
                        key={operator.id}
                        user={operator}
                        onRemove={() => removeOperator(operator.id)}
                        showRole={true}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Add Operator */}
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-700 flex items-center space-x-2">
                  <UserPlus className="w-4 h-4 text-green-500" />
                  <span>Add Operator</span>
                </h5>
                <SearchableUserSelect
                  users={operators}
                  selectedUsers={editData.operators}
                  onAdd={addOperator}
                  placeholder="Search and select operators..."
                  role="operator"
                />
              </div>
            </div>
          )}

          {activeTab === "rooms" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Examination Rooms
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Configure invigilators and camera surveillance for each room
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Building2 className="w-4 h-4" />
                  <span>{editData.rooms.length} rooms</span>
                </div>
              </div>

              {editData.rooms.map((room: any, roomIndex: number) => (
                <div
                  key={roomIndex}
                  className="bg-gradient-to-br from-blue-50/50 to-white border border-blue-100 rounded-2xl p-6 space-y-6"
                >
                  {/* Room Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-gray-900">
                          {room.room}
                        </h5>
                        <p className="text-gray-500 text-sm">
                          {room.courses.length} course(s)
                        </p>
                      </div>
                    </div>
                    {(validationErrors.rooms?.[roomIndex]?.invigilators ||
                      validationErrors.rooms?.[roomIndex]?.camera_urls) && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Requires attention</span>
                      </div>
                    )}
                  </div>

                  {/* Courses Display */}
                  <div className="bg-white/80 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold text-gray-700">
                        Courses
                      </span>
                    </div>
                    <div className="grid gap-2">
                      {room.courses.map((course: any, courseIndex: number) => (
                        <div
                          key={courseIndex}
                          className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                        >
                          <div>
                            <div className="font-semibold text-purple-900 text-sm">
                              {course.course_code}
                            </div>
                            <div className="text-purple-700 text-xs">
                              {course.course_name}
                            </div>
                          </div>
                          {course.capacity && (
                            <div className="px-2 py-1 bg-purple-200 text-purple-800 rounded text-xs font-medium">
                              {course.capacity} seats
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Invigilators Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-gray-700">
                          Invigilators
                        </span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {room.invigilators.length}
                        </span>
                      </div>

                      {validationErrors.rooms?.[roomIndex]?.invigilators && (
                        <ValidationMessage
                          message={
                            validationErrors.rooms[roomIndex].invigilators!
                          }
                          type="error"
                        />
                      )}

                      <div className="space-y-2">
                        {room.invigilators.length === 0 ? (
                          <div className="text-center py-6 bg-yellow-50 rounded-lg border border-yellow-100">
                            <Shield className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                            <p className="text-yellow-600 text-sm">
                              No invigilators assigned
                            </p>
                          </div>
                        ) : (
                          room.invigilators.map((invigilator: any) => (
                            <UserCard
                              key={invigilator.id}
                              user={invigilator}
                              onRemove={() =>
                                removeInvigilator(roomIndex, invigilator.id)
                              }
                              compact={true}
                            />
                          ))
                        )}
                      </div>

                      <SearchableUserSelect
                        users={invigilators}
                        selectedUsers={room.invigilators}
                        onAdd={(userId) => addInvigilator(roomIndex, userId)}
                        placeholder="Add invigilator..."
                        role="invigilator"
                      />
                    </div>

                    {/* Cameras Section */}
                    <div>
                      <CameraUrlManager
                        urls={room.camera_urls}
                        onAdd={(url) => addCameraUrl(roomIndex, url)}
                        onRemove={(urlIndex) =>
                          removeCameraUrl(roomIndex, urlIndex)
                        }
                        error={validationErrors.rooms?.[roomIndex]?.camera_urls}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end">
          <div className="flex items-center space-x-3">
            <button
              onClick={cancelEdit}
              className="px-6 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow"
            >
              Cancel
            </button>
            <button
              onClick={saveEdit}
              disabled={isEditing}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              {isEditing ? (
                <FastBouncingDots />
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                  {Object.keys(validationErrors).length === 0 && (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
