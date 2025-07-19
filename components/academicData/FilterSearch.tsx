import { ChevronDown, Filter, Search } from "lucide-react";
import React from "react";

const FilterAndSearch = ({
  setSearchTerm,
  filteredTerms,
  searchTerm,
  searchPlaceHolder,
  termTitle
}: {
  setSearchTerm: any;
  filteredTerms: any;
  searchTerm: any;
  searchPlaceHolder?: any;
  termTitle: string;
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={searchPlaceHolder || "Search here..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="text-sm text-gray-500 font-medium">
          {filteredTerms.length} {termTitle}{filteredTerms.length !== 1 ? "s" : ""}{" "}
          found
        </div>
      </div>
    </div>
  );
};

export default FilterAndSearch;
