"use client";

import React, { useState, useEffect, useRef } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import SchedulesTopBar from "@/components/admin/schedules/SchedulesTopBar";
import Content from "@/components/admin/schedules/Content";
import EditModal from "@/components/admin/schedules/EditModal";
import ManagementLoading from "@/components/academicData/ManagementLoading";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "@/components/Alert";
import { error } from "console";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import FastBouncingDots from "@/components/BouncingAnimation";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting?: boolean;
  type: "danger" | "warning" | "info";
}

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  isDeleting,
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  const buttonStyles = {
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-yellow-600 hover:bg-yellow-700",
    info: "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl p-6 mx-4 max-w-md w-full shadow-2xl transform animate-in fade-in duration-200">
        <div className="flex items-center mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              type === "danger"
                ? "bg-red-100"
                : type === "warning"
                ? "bg-yellow-100"
                : "bg-blue-100"
            }`}
          >
            <AlertTriangle className={`w-6 h-6 ${typeStyles[type]}`} />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">{message}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className={`px-4 py-2 text-white font-medium rounded-lg transition-colors duration-200 ${buttonStyles[type]}`}
          >
            {isDeleting ? <FastBouncingDots /> : <p>Confirm</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

const SchedulesPage: React.FC = () => {
  const user = useAuth(["admin"]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingSchedule, setEditingSchedule] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "danger" | "warning" | "info";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    onConfirm: () => {},
  });

  const handleDelete = (scheduleId: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Schedule",
      message:
        "Are you sure you want to delete this schedule? This action cannot be undone.",
      type: "danger",
      onConfirm: async () => {
        await handleConfirmDelete(scheduleId);
        setConfirmModal({ ...confirmModal, isOpen: false });
      },
    });
  };

  const handleConfirmDelete = async (id: string) => {
    if (!user) return;
    try {
      setIsDeleting(false);
      await axios.delete(`${baseUrl}/api/v1/schedule/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      await fetchSchedules();
    } catch (error: any) {
      setAlertContent({
        variant: "error",
        message:
          error?.response?.data?.detail ||
          "Something went wrong|| Please try again",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const startEdit = (schedule: any) => {
    setEditingSchedule(schedule.id);
    setEditData({ ...schedule });
  };

  const cancelEdit = () => {
    setEditingSchedule(null);
    setEditData(null);
  };

  const fetchSchedules = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/v1/schedule`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setSchedules(res.data?.schedules);
    } catch (error: any) {
      setAlertContent({
        variant: "error",
        message:
          error?.response?.data?.detail ||
          "Something went wrong|| Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [user]);

  if (!user || loading) {
    return <ManagementLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <SchedulesTopBar fileInputRef={fileInputRef} callBack={fetchSchedules} />
      <Content
        schedules={schedules}
        fileInputRef={fileInputRef}
        startEdit={startEdit}
        handleDelete={handleDelete}
      />
      {editingSchedule && editData && (
        <EditModal
          setEditData={setEditData}
          cancelEdit={cancelEdit}
          editData={editData}
          callback={fetchSchedules}
        />
      )}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        isDeleting={isDeleting}
      />
      {alertContent && (
        <Alert
          variant={alertContent?.variant}
          message={alertContent?.message}
        />
      )}
    </div>
  );
};

export default SchedulesPage;
