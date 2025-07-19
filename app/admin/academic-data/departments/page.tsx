"use client";

import React, { useEffect, useState } from "react";
import MngTopBar from "@/components/academicData/MngTopBar";
import TermsTable from "@/components/academicData/TermsTable";
import FilterAndSearch from "@/components/academicData/FilterSearch";
import AddTermModal from "@/components/academicData/AddTerm";

const DepartmentsManagement = () => {
  const [departments, setDepartments] = useState<any[]>([
    {
      _id: "1",
      name: "Lecturer",
      dateAdded: "2024-07-01",
      status: "active",
    },
    {
      _id: "2",
      name: "Dean of Students",
      dateAdded: "2024-07-02",
      status: "inactive",
    },
  ]);

  const [filteredDepartments, setFilteredDepartments] = useState<any[]>(departments);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const filtered = departments.filter((deprtment: any) =>
      deprtment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchTerm, departments]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-screen bg-gray-50">
      <MngTopBar
        title="Departments Management"
        message="Manage and monitor departments"
        buttonText="Add New Department"
        setShowAddModal={setShowAddModal}
      />

      <FilterAndSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredTerms={filteredDepartments}
        termTitle="department"
        searchPlaceHolder="Search departments..."
      />

      <TermsTable
        filteredTerms={filteredDepartments}
        handleEdit={(id: string) => console.log("Edit", id)}
        handleDelete={(id: string) =>
          console.log("Toggle", id, status)
        }
      />

      {showAddModal && (
        <AddTermModal
          termTitle="Department"
          callBack={() => {}}
          setShowAddModal={setShowAddModal}
          placeholder="Enter department name"
        />
      )}
    </div>
  );
};

export default DepartmentsManagement;
