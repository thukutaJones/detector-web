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

const PositionssManagement = () => {
  const user = useAuth(['admin'])
  const [positions, setPositions] = useState<any[]>([]);

  const [filteredPositions, setFilteredPositions] = useState<any[]>(positions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState<string>("");

  useEffect(() => {
    const filtered = positions.filter((position: any) =>
      position.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPositions(filtered);
  }, [searchTerm, positions]);

  const fetchPositions = async () => {
    if(!user) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/positions`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setPositions(res.data?.positions);
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
      await axios.delete(`${baseUrl}/positions/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setAlertContent({
        message: "Position deleted successfully",
        variant: "success",
      });
      await fetchPositions();
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
    fetchPositions();
  }, [user]);

  if (!user || isLoading)
    return (
      <ManagementLoading
        message="Loading positions"
        subMessage="Preparing the positions management"
      />
    );

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-screen bg-gray-50">
      <MngTopBar
        title="Positions Management"
        message="Manage and monitor positions across detector"
        buttonText="Add New Position"
        setShowAddModal={setShowAddModal}
      />

      <FilterAndSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredTerms={filteredPositions}
        termTitle="position"
        searchPlaceHolder="Search positions..."
      />

      <TermsTable
        filteredTerms={filteredPositions}
        handleEdit={(term: any) => setShowEditModal(term)}
        handleDelete={async (id: string) => await handlePressDelete(id)}
      />

      {showAddModal && (
        <AddTermModal
          termTitle="Position"
          callBack={fetchPositions}
          setShowAddModal={setShowAddModal}
          placeholder="Enter position name"
          postEndpoint="/positions"
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
          termTitle="Position"
          callBack={fetchPositions}
          placeholder="enter position name"
          postEndpoint="/positions"
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
          title="position"
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

export default PositionssManagement;
