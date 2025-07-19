import { Plus } from "lucide-react";
import React from "react";

const MngTopBar = ({
  setShowAddModal,
  title,
  message,
  buttonText,
}: {
  setShowAddModal: any;
  title: string;
  message: string;
  buttonText: string;
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6 h-[100px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">{message}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          <span className="hidden md:block">{buttonText}</span>
        </button>
      </div>
    </div>
  );
};

export default MngTopBar;
