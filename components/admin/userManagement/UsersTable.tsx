"use client";

import React from "react";
import Image from "next/image";
import { Edit, Power, PowerOff, User } from "lucide-react";

interface UserType {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  role: "admin" | "operator" | "invigilator" | string;
  status?: "active" | "inactive";
  lastLogin?: string;
}

interface RoleType {
  value: string;
  icon: React.ElementType;
}

interface UsersTableProps {
  filteredUsers: UserType[];
  roles: RoleType[];
  handleStatusToggle: any;
  handlePressEdit: any;
}

const UsersTable: React.FC<UsersTableProps> = ({
  filteredUsers,
  roles,
  handleStatusToggle,
  handlePressEdit,
}) => {
  const getRoleIcon = (role: string): React.ElementType => {
    const roleData = roles.find((r) => r.value === role);
    return roleData?.icon || User;
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-red-100 text-red-800",
      operator: "bg-blue-100 text-blue-800",
      invigilator: "bg-purple-100 text-purple-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="px-2 sm:px-4 h-[calc(100vh-200px)] flex flex-col">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        {/* Scrollable Table Container */}
        <div className="overflow-auto w-full scroll-container">
          <table className="min-w-[700px] w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                {[
                  "User",
                  "Contact",
                  "Role",
                  "Last Login",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <tr
                    key={user.id || index}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    {/* User Info */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <Image
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
                          src="/profile.png"
                          alt={user.fullName}
                          height={40}
                          width={40}
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.fullName}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {user.position}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-gray-900">{user.email}</p>
                      <p className="text-gray-500 text-xs">{user.phone}</p>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>

                    {/* Last Login */}
                    <td className="px-4 py-4 whitespace-nowrap text-gray-500 text-sm">
                      {user.lastLogin ? (
                        <p>{new Date(user.lastLogin).toLocaleDateString()}</p>
                      ) : (
                        <span className="text-2xl text-gray-400">--</span>
                      )}
                    </td>

                    {/* Status / Actions */}
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {user?.role !== "admin" && (
                        <button
                          onClick={() =>
                            handleStatusToggle(user.id, user.status)
                          }
                          className={`inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium transition hover:scale-105 ${
                            user.status === "active"
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          {user.status === "active" ? (
                            <>
                              <PowerOff className="w-3 h-3 mr-1" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Power className="w-3 h-3 mr-1" />
                              Activate
                            </>
                          )}
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        className="inline-flex items-center px-2.5 py-1.5 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium hover:bg-yellow-200 transition hover:scale-105"
                        onClick={async () => await handlePressEdit(user)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
