import { Trash2 } from "lucide-react";
import React from "react";
import FastBouncingDots from "./BouncingAnimation";

const ComfirmationModal = ({
  confirmAction,
  setShowConfirmModal,
  handleComfirm,
  title,
  isLoading = false,
  id,
}: {
  confirmAction: any;
  setShowConfirmModal: any;
  handleComfirm: any;
  title: string;
  isLoading: boolean;
  id: string;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-8">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            Delete {title}
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to {confirmAction?.type} this {title}? This
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
              onClick={async () => await handleComfirm(id)}
              disabled={isLoading}
              className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors duration-200 bg-red-600 hover:bg-red-700`}
            >
              {isLoading ? <FastBouncingDots /> : <p>Delete</p>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComfirmationModal;
