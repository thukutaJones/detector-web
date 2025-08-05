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
import EditUserModal from "@/components/admin/userManagement/EditUser";

type ConfirmActionType = {
  type: "activate" | "inactivate";
  userId: string;
  currentStatus: string;
  newStatus: string;
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
  const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
  const [userToEdit, setUserToEdit] = useState<any>({});
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

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
      const res = await axios.get(`${baseUrl}/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setUsers(res.data?.users);
      console.log(res.data?.users);
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
    // On initial load, read role from URL
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get("role") || "all";
    setSelectedRole(roleParam);
  }, []); // Only run once on mount

  useEffect(() => {
    // Update the URL when selectedRole changes
    const url = new URL(window.location.href);
    if (selectedRole === "all") {
      url.searchParams.delete("role");
    } else {
      url.searchParams.set("role", selectedRole);
    }
    window.history.replaceState({}, "", url.toString());

    // Filter users
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

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    setConfirmAction({
      type: currentStatus === "active" ? "inactivate" : "activate",
      userId,
      currentStatus,
      newStatus: currentStatus === "active" ? "inactive" : "active",
    });
    setShowConfirmModal(true);
  };

  const confirmStatusChange = async () => {
    if (confirmAction) {
      try {
        setIsChangingStatus(true);
        await axios.put(
          `${baseUrl}/api/v1/user/change-status/${confirmAction?.userId}/${confirmAction?.newStatus}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        await fetchUsers();
      } catch (error: any) {
        setAlertContent({
          variant: "error",
          message:
            error?.response?.data?.detail ||
            "Something went wrong!! Please try again",
        });
      } finally {
        setIsChangingStatus(false);
      }
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  if (!user || isLoading) return <ManagementLoading context="users" />;

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-screen bg-white">
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
        handleStatusToggle={(id: any, status: string) =>
          handleStatusToggle(id, status)
        }
        handlePressEdit={(user: any) => {
          setUserToEdit(user);
          setToggleEdit(true);
        }}
      />

      {showAddModal && (
        <AddUserModal setShowAddModal={setShowAddModal} callBack={fetchUsers} />
      )}

      {toggleEdit && (
        <EditUserModal
          setToggleEditModal={setToggleEdit}
          oldUser={userToEdit}
          callBack={fetchUsers}
        />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          confirmAction={confirmAction}
          setShowConfirmModal={setShowConfirmModal}
          confirmStatusChange={confirmStatusChange}
          isLoading={isChangingStatus}
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
