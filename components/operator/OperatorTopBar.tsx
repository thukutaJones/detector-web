import { getGreeting } from "@/utils/getGreeting";
import { Activity } from "lucide-react";
import React from "react";

const OperatorTopBar = ({ cameras }: { cameras: any }) => {
  return (
    <header className="bg-white border-b border-gray-100 h-[85px] top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">OPERATOR Panel</h1>
              <p className="text-sm text-gray-600">
                {getGreeting()}, welcome back!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-green-50 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-bold text-xs">
                  {cameras.filter((c: any) => c.active).length} Active Cameras
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-600">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OperatorTopBar;
