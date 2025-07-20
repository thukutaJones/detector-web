"use client";

import React, { useEffect, useState } from "react";
import MngTopBar from "@/components/academicData/MngTopBar";
import TermsTable from "@/components/academicData/TermsTable";
import FilterAndSearch from "@/components/academicData/FilterSearch";
import AddTermModal from "@/components/academicData/AddTerm";
import ManagementLoading from "@/components/academicData/ManagementLoading";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { Alert } from "@/components/Alert";
import ComfirmationModal from "@/components/ComfirmationModal";
import EditTermModal from "@/components/academicData/EditTerm";
import { useAuth } from "@/hooks/useAuth";

interface AlertProps {
  message: string;
  variant: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

const CoursesManagement = () => {
  const user = useAuth(["admin"]);
  const [courses, setCourses] = useState<any[]>([]);

  const [filteredCourses, setFilteredCourses] = useState<any[]>(courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState<string>("");

  useEffect(() => {
    const filtered = courses.filter((course: any) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  const fetchCourses = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/courses`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setCourses(res.data?.courses);
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressDelete = async (id: string) => {
    setToggleDeleteModal(id);
  };

  const handledelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await axios.delete(`${baseUrl}/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setAlertContent({
        message: "Course deleted successfully",
        variant: "success",
      });
      await fetchCourses();
      setToggleDeleteModal("");
    } catch (error: any) {
      setAlertContent({
        message:
          error?.response?.data?.detail ||
          "Something went wrong!! Please try again",
        variant: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user]);

  if (!user || isLoading)
    return (
      <ManagementLoading
        message="Loading courses"
        subMessage="Preparing the courses management"
        context="courses"
      />
    );

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-screen bg-gray-50">
      <MngTopBar
        title="Courses Management"
        message="Manage and monitor courses across detector"
        buttonText="Add New Course"
        setShowAddModal={setShowAddModal}
      />

      <FilterAndSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredTerms={filteredCourses}
        termTitle="course"
        searchPlaceHolder="Search courses..."
      />

      <TermsTable
        filteredTerms={filteredCourses}
        handleEdit={(term: any) => setShowEditModal(term)}
        handleDelete={async (id: string) => await handlePressDelete(id)}
      />

      {showAddModal && (
        <AddTermModal
          termTitle="Course"
          callBack={fetchCourses}
          setShowAddModal={setShowAddModal}
          placeholder="Enter course name"
          postEndpoint="/courses"
          handleAlert={(alert: AlertProps) =>
            setAlertContent({
              variant: alert?.variant,
              message: alert?.message,
            })
          }
        />
      )}

      {showEditModal && (
        <EditTermModal
          term={showEditModal}
          setShowEditModal={setShowEditModal}
          termTitle="Course"
          callBack={fetchCourses}
          placeholder="enter course name"
          postEndpoint="/courses"
          handleAlert={(alert: AlertProps) =>
            setAlertContent({
              message: alert?.message,
              variant: alert?.variant,
            })
          }
        />
      )}

      {alertContent && (
        <Alert
          message={alertContent?.message}
          variant={alertContent?.variant}
          onClose={() => setAlertContent(null)}
        />
      )}

      {toggleDeleteModal && (
        <ComfirmationModal
          title="course"
          confirmAction={async (id: string) => await handledelete(id)}
          setShowConfirmModal={setToggleDeleteModal}
          handleComfirm={async (id: string) => await handledelete(id)}
          isLoading={!!isDeleting}
          id={toggleDeleteModal}
        />
      )}
    </div>
  );
};

export default CoursesManagement;
