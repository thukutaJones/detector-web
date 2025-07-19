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

const RoomsManagement = () => {
  const user = useAuth(["admin"]);
  const [rooms, setRooms] = useState<any[]>([]);

  const [filteredRooms, setFilteredRooms] = useState<any[]>(rooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertProps | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState<string>("");

  useEffect(() => {
    const filtered = rooms.filter((room: any) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(filtered);
  }, [searchTerm, rooms]);

  const fetchRooms = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/rooms`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setRooms(res.data?.rooms);
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
      await axios.delete(`${baseUrl}/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setAlertContent({
        message: "Room deleted successfully",
        variant: "success",
      });
      await fetchRooms();
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
    fetchRooms();
  }, [user]);

  if (!user || isLoading)
    return (
      <ManagementLoading
        message="Loading rooms"
        subMessage="Preparing the rooms management"
        context="rooms"
      />
    );

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-screen bg-gray-50">
      <MngTopBar
        title="Rooms Management"
        message="Manage and monitor rooms across detector"
        buttonText="Add New Room"
        setShowAddModal={setShowAddModal}
      />

      <FilterAndSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredTerms={filteredRooms}
        termTitle="room"
        searchPlaceHolder="Search rooms..."
      />

      <TermsTable
        filteredTerms={filteredRooms}
        handleEdit={(term: any) => setShowEditModal(term)}
        handleDelete={async (id: string) => await handlePressDelete(id)}
      />

      {showAddModal && (
        <AddTermModal
          termTitle="Room"
          callBack={fetchRooms}
          setShowAddModal={setShowAddModal}
          placeholder="Enter room name"
          postEndpoint="/rooms"
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
          termTitle="Room"
          callBack={fetchRooms}
          placeholder="enter room name"
          postEndpoint="/rooms"
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
          title="room"
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

export default RoomsManagement;
