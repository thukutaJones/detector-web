"use client";

import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import BouncingDotsLoader from "../BouncingAnimation";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const EditTermModal = ({
  term,
  setShowEditModal,
  termTitle,
  callBack,
  placeholder,
  postEndpoint,
  handleAlert,
}: {
  term: any;
  setShowEditModal: any; 
  termTitle: string;
  callBack: any;
  placeholder?: string;
  postEndpoint: string;
  handleAlert: (alert: AlertProps) => void;
}) => {
  const [termName, setTermName] = useState<string>(term?.name);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleEditTerm = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(
        `${baseUrl}${postEndpoint}/${term?.id}`,
        {
          name: termName,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZ1bGxOYW1lIjoiSmFuZSBEb2UiLCJwaG9uZSI6IjU1NS0xMjM0IiwiZ2VuZGVyIjoiZmVtYWxlIiwicm9sZSI6ImFkbWluIiwibGFzdExvZ2luIjoiMjAyNS0wNy0xOSAxMDozOTowOS44NTQ4NzkiLCJlbWFpbCI6ImphbmUuZG9lQGV4YW1wbGUuY29tIiwidmVyaWZpZWRFbWFpbCI6dHJ1ZSwicGFzc3dvcmQiOiIiLCJjcmVhdGVkIjoiMjAyNS0wNy0xOSAxMDozNTo1Ni4wOTY4NjgiLCJ1cGRhdGVkIjoiMjAyNS0wNy0xOSAxMDozNTo1Ni4wOTY4OTIiLCJpZCI6IjY4N2I1OGVjZWZlYTYxNWZlNGE0ZjdlMyJ9LCJleHAiOjE3ODE5NDQ5NDZ9.ZJ5uVzB3wZ8Gt_Owx_yaIPX50yP-N0C14awJldGH3Zs`,
          },
        }
      );
      await callBack();
      setShowEditModal(false);
    } catch (error: any) {
      handleAlert({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onSubmit={handleEditTerm}
      >
        <div className="bg-gradient-to-b from-green-600 via-green-500 to-transparent px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Edit {termTitle}
            </h2>
            <button
              onClick={() => setShowEditModal(false)}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {termTitle} Name
          </label>
          <input
            type="text"
            value={termName}
            onChange={(e) => setTermName(e.target.value)}
            placeholder={placeholder || "Enter name"}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="px-6 py-4 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!termName?.trim() || isSubmitting}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <BouncingDotsLoader /> : <p>Edit {termTitle}</p>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTermModal;
