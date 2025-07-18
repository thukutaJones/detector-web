"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Power,
  PowerOff,
  Users,
  Filter,
  X,
  ChevronDown,
  User,
  Mail,
  Phone,
  Briefcase,
  UserCheck,
} from "lucide-react";

// Entire component remains the same as before
const UserManagement = () => {
  const [users, setUsers] = useState([
    // ... your default users list
    // (No change required)
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showAddRoleDropdown, setShowAddRoleDropdown] = useState(false);
  const [showAddPositionDropdown, setShowAddPositionDropdown] = useState(false);

  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    sex: "",
    position: "",
  });

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
    "Quality Assurance",
    "IT Support",
    "Data Analyst",
    "Project Manager",
  ];

  // Fetch initial role from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role") || "all";
    setSelectedRole(roleParam);
  }, []);

  useEffect(() => {
    const url = new URL(window.location);
    if (selectedRole === "all") {
      url.searchParams.delete("role");
    } else {
      url.searchParams.set("role", selectedRole);
    }
    window.history.replaceState({}, "", url);

    // Apply filters
    let filtered = [...users];
    if (selectedRole !== "all") {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      );
    }
    setFilteredUsers(filtered);
  }, [selectedRole, searchTerm, users]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setShowRoleDropdown(false);
  };

  const handleStatusToggle = (userId, currentStatus) => {
    setConfirmAction({
      type: currentStatus === "active" ? "deactivate" : "activate",
      userId,
      currentStatus,
    });
    setShowConfirmModal(true);
  };

  const confirmStatusChange = () => {
    if (confirmAction) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === confirmAction.userId
            ? {
                ...user,
                status:
                  confirmAction.currentStatus === "active"
                    ? "inactive"
                    : "active",
              }
            : user
        )
      );
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      status: "active",
      lastLogin: new Date().toISOString().split("T")[0],
      avatar: `https://images.unsplash.com/photo-${
        Math.random() > 0.5
          ? "1472099645785-5658abf4ff4e"
          : "1494790108755-2616b667fcce"
      }?w=150&h=150&fit=crop&crop=face`,
    };
    setUsers([...users, user]);
    setNewUser({
      fullName: "",
      email: "",
      phone: "",
      role: "",
      sex: "",
      position: "",
    });
    setShowAddModal(false);
  };

  const getRoleIcon = (role) => {
    const roleData = roles.find((r) => r.value === role);
    return roleData ? roleData.icon : User;
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: "bg-red-100 text-red-800",
      operator: "bg-blue-100 text-blue-800",
      invigilator: "bg-purple-100 text-purple-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
   <div className="flex-1 flex flex-col overflow-hidden min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="mt-2 text-gray-600">Manage and monitor user accounts across detector</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New User
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white border-b border-gray-200 px-8 py-4">
                <div className="flex items-center space-x-4">
                    {/* Role Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            <Filter className="w-4 h-4 mr-2 text-gray-500" />
                            <span className="font-medium text-gray-700">
                                {roles.find(r => r.value === selectedRole)?.label}
                            </span>
                            <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
                        </button>

                        {showRoleDropdown && (
                            <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    return (
                                        <button
                                            key={role.value}
                                            onClick={() => handleRoleChange(role.value)}
                                            className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${selectedRole === role.value ? 'bg-green-50 text-green-600' : 'text-gray-700'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4 mr-3" />
                                            {role.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Search */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="text-sm text-gray-500 font-medium">
                        {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                    </div>
                </div>
            </div>

            {/* User Table */}
            <div className="flex-1 overflow-auto px-8 py-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Login</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => {
                                    const RoleIcon = getRoleIcon(user.role);
                                    return (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12">
                                                        <img
                                                            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200"
                                                            src={user.avatar}
                                                            alt={user.fullName}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold text-gray-900">{user.fullName}</div>
                                                        <div className="text-sm text-gray-500">{user.position}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                                <div className="text-sm text-gray-500">{user.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                                    <RoleIcon className="w-3 h-3 mr-1" />
                                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                                        }`} />
                                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.lastLogin}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleStatusToggle(user.id, user.status)}
                                                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 transform hover:scale-105 ${user.status === 'active'
                                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                            }`}
                                                    >
                                                        {user.status === 'active' ? (
                                                            <><PowerOff className="w-3 h-3 mr-1" />Deactivate</>
                                                        ) : (
                                                            <><Power className="w-3 h-3 mr-1" />Activate</>
                                                        )}
                                                    </button>
                                                    <button className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium hover:bg-yellow-200 transition-all duration-200 transform hover:scale-105">
                                                        <Edit className="w-3 h-3 mr-1" />
                                                        Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
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
                                        onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
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
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
                                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
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
                                            <span className={newUser.role ? 'text-gray-900' : 'text-gray-500'}>
                                                {newUser.role ? roles.find(r => r.value === newUser.role)?.label : 'Select role'}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-gray-500" />
                                        </button>
                                        {showAddRoleDropdown && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                                {roles.slice(1).map((role) => {
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
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Briefcase className="w-4 h-4 inline mr-2" />
                                        Position
                                    </label>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowAddPositionDropdown(!showAddPositionDropdown)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 flex items-center justify-between bg-white"
                                        >
                                            <span className={newUser.position ? 'text-gray-900' : 'text-gray-500'}>
                                                {newUser.position || 'Select position'}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-gray-500" />
                                        </button>
                                        {showAddPositionDropdown && (
                                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                                {positions.map((position) => (
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
                                </div>

                                {/* Sex */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sex</label>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="sex"
                                                value="male"
                                                checked={newUser.sex === 'male'}
                                                onChange={(e) => setNewUser({ ...newUser, sex: e.target.value })}
                                                className="mr-2 text-green-600 focus:ring-green-500"
                                            />
                                            Male
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="sex"
                                                value="female"
                                                checked={newUser.sex === 'female'}
                                                onChange={(e) => setNewUser({ ...newUser, sex: e.target.value })}
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
                                    disabled={!newUser.fullName || !newUser.email || !newUser.role}
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                                >
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="p-8">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
                                {confirmAction?.type === 'activate' ? (
                                    <Power className="w-8 h-8 text-yellow-600" />
                                ) : (
                                    <PowerOff className="w-8 h-8 text-yellow-600" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                                {confirmAction?.type === 'activate' ? 'Activate User' : 'Deactivate User'}
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                Are you sure you want to {confirmAction?.type} this user? This action can be reversed later.
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmStatusChange}
                                    className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors duration-200 ${confirmAction?.type === 'activate'
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                >
                                    {confirmAction?.type === 'activate' ? 'Activate' : 'Deactivate'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
  );
};

export default UserManagement;
