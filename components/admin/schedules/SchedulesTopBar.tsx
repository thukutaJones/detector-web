import { baseUrl } from "@/constants/baseUrl";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import React, { useState } from "react";

const SchedulesTopBar = ({
  fileInputRef,
  callBack,
}: {
  fileInputRef?: any;
  callBack: any;
}) => {
  const user = useAuth(["admin", "operator"]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/schedule/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(progress);
          },
        }
      );

      await callBack();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="bg-white px-8 py-6 h-[100px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Schedules</h1>
          <p className="mt-2 text-gray-600 text-sm">
            AI-powered exam monitoring & academic integrity
          </p>
        </div>
        {user?.user?.role === "admin" && (
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  <span className="hidden md:block text-sm font-semibold">
                    Upload Schedule
                  </span>
                </>
              )}
            </button>
            {uploading && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-green-300 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulesTopBar;
