"use client";

import React, { useEffect, useState } from "react";
import { Users, UserCheck, User, Briefcase } from "lucide-react";
import UserMngTopBar from "@/components/admin/userManagement/UserMngTopBar";
import FilterAndSearch from "@/components/admin/userManagement/FilterAndSearch";
import UsersTable from "@/components/admin/userManagement/UsersTable";
import AddUserModal from "@/components/admin/userManagement/AddUserModal";
import ConfirmationModal from "@/components/admin/userManagement/ComfirmationModal";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "@/components/Alert";
import ManagementLoading from "@/components/academicData/ManagementLoading";

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
  const user = useAuth(["admin"]);
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

  const fetchUsers = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUsers(res.data?.users);
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
    fetchUsers();
  }, [user]);

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

  if (!user || isLoading) return <ManagementLoading context="users" />;

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-screen bg-gray-50">
      <div className="w-full h-[190px]">
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
      </div>

      <UsersTable
        filteredUsers={filteredUsers}
        roles={roles}
      />

      {showAddModal && (
        <AddUserModal
          setShowAddModal={setShowAddModal}
          callBack={fetchUsers}
        />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          confirmAction={confirmAction}
          setShowConfirmModal={setShowConfirmModal}
          confirmStatusChange={confirmStatusChange}
        />
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

export default UserManagement;
