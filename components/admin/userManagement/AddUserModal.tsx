import FastBouncingDots from "@/components/BouncingAnimation";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import {
  Briefcase,
  ChevronDown,
  Mail,
  Phone,
  User,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const AddUserModal = ({
  setShowAddModal,
  callBack,
}: {
  setShowAddModal: any;
  callBack: any;
}) => {
  const user = useAuth(["admin"]);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    sex: "",
    position: "",
  });
  const [formError, setFormError] = useState<string>("");

  const [showAddRoleDropdown, setShowAddRoleDropdown] = useState(false);
  const [showAddPositionDropdown, setShowAddPositionDropdown] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);

  const roles = [
    { value: "all", label: "All Roles", icon: Users },
    { value: "admin", label: "Administrator", icon: UserCheck },
    { value: "operator", label: "Operator", icon: User },
    { value: "invigilator", label: "Invigilator", icon: Briefcase },
  ];

  const positions = [
    "System Administrator",
    "Operations Manager",
    "Senior Invigilator",
    "HR Administrator",
    "Lecturer",
    "IT Support",
    "Data Analyst",
  ];

  const handleAddUser = async (e: any) => {
    e.preventDefault();
    setIsAddingUser(true);
    setFormError("")
    try {
      const payload = {
        fullName: newUser?.fullName,
        phone: newUser?.phone,
        gender: newUser?.sex,
        role: newUser?.role,
        email: newUser?.email,
        verifiedEmail: false,
      };

      await axios.post(`${baseUrl}/users`, payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      callBack();
      setShowAddModal(false);
    } catch (error: any) {
      console.log(error);
      setFormError(
        error?.response?.data?.detail ||
          "Something went wrong!! Please try again"
      );
    } finally {
      setIsAddingUser(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-b from-green-600 via-green-500 to-transparent px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Add New User</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-white hover:text-green-200 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {formError && (
          <div className="px-4 mt-2">
            <div className="p-4 bg-red-100 text-red-800 rounded-lg text-sm font-bold">
              <p>{formError}</p>
            </div>
          </div>
        )}

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={newUser.fullName}
                onChange={(e) =>
                  setNewUser({ ...newUser, fullName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter email address"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter phone number"
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <UserCheck className="w-4 h-4 inline mr-2" />
                Role
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowAddRoleDropdown(!showAddRoleDropdown)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 flex items-center justify-between bg-white"
                >
                  <span
                    className={newUser.role ? "text-gray-900" : "text-gray-500"}
                  >
                    {newUser.role
                      ? roles.find((r: any) => r.value === newUser.role)?.label
                      : "Select role"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showAddRoleDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    {roles.slice(1).map((role: any) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.value}
                          onClick={() => {
                            setNewUser({ ...newUser, role: role.value });
                            setShowAddRoleDropdown(false);
                          }}
                          className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Icon className="w-4 h-4 mr-3 text-gray-500" />
                          {role.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Position Dropdown */}
            {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-2" />
                  Position
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowAddPositionDropdown(!showAddPositionDropdown)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 flex items-center justify-between bg-white"
                  >
                    <span
                      className={
                        newUser.position ? "text-gray-900" : "text-gray-500"
                      }
                    >
                      {newUser.position || "Select position"}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  {showAddPositionDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {positions.map((position: any) => (
                        <button
                          key={position}
                          onClick={() => {
                            setNewUser({ ...newUser, position });
                            setShowAddPositionDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          {position}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}

            {/* Sex */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sex
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={newUser.sex === "male"}
                    onChange={(e) =>
                      setNewUser({ ...newUser, sex: e.target.value })
                    }
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={newUser.sex === "female"}
                    onChange={(e) =>
                      setNewUser({ ...newUser, sex: e.target.value })
                    }
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              disabled={
                !newUser.fullName ||
                !newUser.email ||
                !newUser.role ||
                isAddingUser
              }
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isAddingUser ? <FastBouncingDots /> : <p> Add User</p>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
