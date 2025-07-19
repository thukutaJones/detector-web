"use client";

import React, { useEffect, useState } from "react";
import { Users, UserCheck, User, Briefcase } from "lucide-react";
import UserMngTopBar from "@/components/admin/userManagement/UserMngTopBar";
import FilterAndSearch from "@/components/admin/userManagement/FilterAndSearch";
import UsersTable from "@/components/admin/userManagement/UsersTable";
import AddUserModal from "@/components/admin/userManagement/AddUserModal";
import ConfirmationModal from "@/components/admin/userManagement/ComfirmationModal";
import axios from "axios";

type ConfirmActionType = {
  type: "activate" | "deactivate";
  userId: string;
  currentStatus: "active" | "inactive";
} | null;

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);

  const [filteredUsers, setFilteredUsers] = useState<any[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmActionType>(null);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setShowRoleDropdown(false);
  };

  const handleStatusToggle = (
    userId: string,
    currentStatus: "active" | "inactive"
  ) => {
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
          user._id === confirmAction.userId
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

  const fetchUsers = async () => {
    try {
      const res = await axios.get(``);
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
      console.log(error);
    }
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
