import FastBouncingDots from "@/components/BouncingAnimation";
import { Power, PowerOff } from "lucide-react";
import React from "react";

const ComfirmationModal = ({
  confirmAction,
  setShowConfirmModal,
  confirmStatusChange,
  isLoading = false,
}: {
  confirmAction: any;
  setShowConfirmModal: any;
  confirmStatusChange: any;
  isLoading?: boolean;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
            {confirmAction?.type === "activate" ? (
              <Power className="w-8 h-8 text-yellow-600" />
            ) : (
              <PowerOff className="w-8 h-8 text-yellow-600" />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            {confirmAction?.type === "activate"
              ? "Activate User"
              : "Deactivate User"}
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to {confirmAction?.type} this user? This
            action can be reversed later.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmStatusChange}
              disabled={isLoading}
              className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                confirmAction?.type === "activate"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isLoading ? (
                <FastBouncingDots />
              ) : (
                <p>
                  {confirmAction?.type === "activate"
                    ? "Activate"
                    : "Deactivate"}
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComfirmationModal;
