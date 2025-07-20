import { ChevronDown, Filter, Search } from "lucide-react";
import React from "react";

const FilterAndSearch = ({
  setShowRoleDropdown,
  selectedRole,
  showRoleDropdown,
  roles,
  handleRoleChange,
  setSearchTerm,
  filteredUsers,
  searchTerm,
}: {
  setShowRoleDropdown: any;
  selectedRole: any;
  showRoleDropdown: any;
  roles: any;
  handleRoleChange: any;
  setSearchTerm: any;
  filteredUsers: any;
  searchTerm: any;
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <span className="font-medium text-gray-700">
              {roles.find((r: any) => r.value === selectedRole)?.label}
            </span>
            <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
          </button>

          {showRoleDropdown && (
            <div className="absolute z-30 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              {roles.map((role: any) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.value}
                    onClick={() => handleRoleChange(role.value)}
                    className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                      selectedRole === role.value
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700"
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

        <div className="text-sm text-gray-500 font-medium">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}{" "}
          found
        </div>
      </div>
    </div>
  );
};

export default FilterAndSearch;
