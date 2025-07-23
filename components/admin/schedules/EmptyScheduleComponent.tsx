import { Calendar } from "lucide-react";
import React from "react";

const EmptyScheduleComponent = ({
  setShowScheduleModal,
}: {
  setShowScheduleModal: any;
}) => {
  return (
    <div className="text-center py-20">
      <div className="bg-white rounded-3xl shadow-sm hover:shadow-green-600 p-16 max-w-2xl mx-auto border border-gray-100">
        <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <Calendar className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          No Schedules Yet
        </h3>
        <p className="text-xs text-gray-600 mb-8">
          Create your first examination schedule to get started
        </p>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Create Your First Schedule
        </button>
      </div>
    </div>
  );
};

export default EmptyScheduleComponent;
