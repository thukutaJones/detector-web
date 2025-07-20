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
  handleStatusToggle?: (id: string, status?: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  filteredUsers,
  roles,
  handleStatusToggle,
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
    <div className="px-4 h-[calc(100vh-200px)] flex flex-col">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                {["User", "Contact", "Role", "Last Login", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          <table className="w-full table-fixed">
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <tr
                    key={user.id || index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* User Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <Image
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200"
                            src="/profile.png"
                            alt={user.fullName}
                            height={200}
                            width={200}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.position}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {user.role.charAt(0).toUpperCase() +
                          user.role.slice(1)}
                      </span>
                    </td>

                    {/* Last Login */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? (
                        <p>{user.lastLogin}</p>
                      ) : (
                        <p className="text-3xl text-red-600">--</p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {/* Optional Status Toggle */}
                        {/* {handleStatusToggle && (
                          <button
                            onClick={() =>
                              handleStatusToggle(user.id, user.status)
                            }
                            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 transform hover:scale-105 ${
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
                        )} */}

                        {/* Edit */}
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
  );
};

export default UsersTable;
