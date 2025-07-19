"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  User,
  Briefcase,
} from "lucide-react";
import UserMngTopBar from "@/components/admin/userManagement/UserMngTopBar";
import FilterAndSearch from "@/components/admin/userManagement/FilterAndSearch";
import UsersTable from "@/components/admin/userManagement/UsersTable";
import AddUserModal from "@/components/admin/userManagement/AddUserModal";
import ConfirmationModal from "@/components/admin/userManagement/ComfirmationModal";

type UserType = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status: "active" | "inactive";
};

type ConfirmActionType = {
  type: "activate" | "deactivate";
  userId: string;
  currentStatus: "active" | "inactive";
} | null;

const UserManagement = () => {
  const [users, setUsers] = useState<UserType[]>([
    {
      _id: "1",
      fullName: "Alice Johnson",
      email: "alice@example.com",
      role: "admin",
      status: "active",
    },
    {
      _id: "2",
      fullName: "Bob Smith",
      email: "bob@example.com",
      role: "invigilator",
      status: "inactive",
    },
  ]);

  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmActionType>(null);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles = [
    { value: "all", label: "All Roles", icon: Users },
    { value: "admin", label: "Administrator", icon: UserCheck },
    { value: "operator", label: "Operator", icon: User },
    { value: "invigilator", label: "Invigilator", icon: Briefcase },
  ];

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role") || "all";
    setSelectedRole(roleParam);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedRole === "all") {
      url.searchParams.delete("role");
    } else {
      url.searchParams.set("role", selectedRole);
    }
    window.history.replaceState({}, "", url.toString());

    let filtered = [...users];
    if (selectedRole !== "all") {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.fullName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term)
      );
    }

    setFilteredUsers(filtered);
  }, [selectedRole, searchTerm, users]);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setShowRoleDropdown(false);
  };

  const handleStatusToggle = (userId: string, currentStatus: "active" | "inactive") => {
    setConfirmAction({
      type: currentStatus === "active" ? "deactivate" : "activate",
      userId,
      currentStatus,
    });
    setShowConfirmModal(true);
  };

  const confirmStatusChange = () => {
    if (confirmAction) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === confirmAction.userId
            ? {
                ...user,
                status: confirmAction.currentStatus === "active" ? "inactive" : "active",
              }
            : user
        )
      );
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-screen bg-gray-50">
      <UserMngTopBar setShowAddModal={setShowAddModal} />

      <FilterAndSearch
        setShowRoleDropdown={setShowRoleDropdown}
        selectedRole={selectedRole}
        showRoleDropdown={showRoleDropdown}
        roles={roles}
        handleRoleChange={handleRoleChange}
        setSearchTerm={setSearchTerm}
        filteredUsers={filteredUsers}
        searchTerm={searchTerm}
      />

      <UsersTable
        filteredUsers={filteredUsers}
        roles={roles}
        handleStatusToggle={handleStatusToggle}
      />

      {showAddModal && <AddUserModal setShowAddModal={setShowAddModal} />}

      {showConfirmModal && (
        <ConfirmationModal
          confirmAction={confirmAction}
          setShowConfirmModal={setShowConfirmModal}
          confirmStatusChange={confirmStatusChange}
        />
      )}
    </div>
  );
};

export default UserManagement;
