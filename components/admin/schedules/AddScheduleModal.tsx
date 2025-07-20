import FastBouncingDots from "@/components/BouncingAnimation";
import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { User, X, Loader2, AlertTriangle } from "lucide-react";

import React, { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const AddScheduleModal = ({
  setShowScheduleModal,
  callBack,
  handleAlert,
}: {
  setShowScheduleModal: any;
  callBack: any;
  handleAlert: (alert: AlertProps) => void;
}) => {
  const user = useAuth(["admin"]);
  const [operators, setOperators] = useState<any[]>([]);
  const [selectedOperators, setSelectedOperators] = useState<any>([]);
  const [scheduleDate, setScheduleDate] = useState<any>("");
  const [isFetchingOperators, setisfetchingOperators] =
    useState<boolean>(false);
  const [isAddingSchedule, setIsAddingSchedule] = useState<boolean>(false);

  const fetchOperators = async () => {
    setisfetchingOperators(true);
    try {
      const res = await axios.get(`${baseUrl}/users/role/operator`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setOperators(res.data?.users);
    } catch (error: any) {
      handleAlert({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    } finally {
      setisfetchingOperators(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleAddSchedule = async (e: any) => {
    e.preventDefault();
    setIsAddingSchedule(true);
    try {
      await axios.post(
        `${baseUrl}/schedules`,
        {
          date: scheduleDate,
          operator_ids: selectedOperators,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      await callBack();
      setShowScheduleModal(false);
    } catch (error: any) {
      handleAlert({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    } finally {
      setIsAddingSchedule(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onSubmit={handleAddSchedule}
      >
        {/* Header */}
        <div className="bg-gradient-to-b from-green-600 via-green-500 to-transparent px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Create New Schedule
            </h2>
            <button
              type="button"
              onClick={() => setShowScheduleModal(false)}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Examination Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Examination Date
            </label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              min={getMinDate()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Select Operators */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Operators
            </label>

            <div className="mt-4">
              {isFetchingOperators ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-5 h-5 animate-spin text-green-600" />
                  Fetching operators...
                </div>
              ) : operators && operators.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {operators.map((operator: any, index: number) => (
                    <label
                      key={index.toString()}
                      className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedOperators.includes(operator.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedOperators.includes(operator.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOperators([
                              ...selectedOperators,
                              operator.id,
                            ]);
                          } else {
                            setSelectedOperators(
                              selectedOperators.filter(
                                (id: string) => id !== operator.id
                              )
                            );
                          }
                        }}
                        className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {operator.fullName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {operator.email}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600 mt-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>No operators available at the moment.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end space-x-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setShowScheduleModal(false)}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              !scheduleDate ||
              selectedOperators.length === 0 ||
              isAddingSchedule
            }
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingSchedule ? <FastBouncingDots /> : <p>Create Schedule</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScheduleModal;
