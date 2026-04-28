"use client";
import React, { useState } from "react";
import GenericTable from "@/shared/ui/GenericTable";
import { recentUsers } from "@/widgets/overview/ui/data";
import { recentUsersTableConfig } from "@/shared/config/tableConfig";
import { Pagination } from "@/shared/ui/Pagination";
import { usePagination } from "@/shared";
import TableHeader from "@/shared/ui/TableHeader";
import { useModal } from "@/shared/model/useModal";
import { ViewUserModal } from "./ViewUserModal";
import { DeleteUserModal } from "./DeleteUserModal";
import { EditUserModal } from "./EditUserModal";
import { userActionToasts } from "@/shared/utils/toast";

const UserManagement = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal states
  const viewModal = useModal();
  const deleteModal = useModal();
  const editModal = useModal();
  
  const {
    paginatedData,
    currentPage,
    totalPages,
    totalItems,
    pageRange,
    goToPage,
    goToNext,
    goToPrev,
    canGoNext,
    canGoPrev,
    startIndex,
    endIndex,
  } = usePagination({
    data: recentUsers,
    itemsPerPage: itemsPerPage,
    siblingCount: 1,
    resetDeps: [recentUsers, itemsPerPage], 
  });

  // Modal handlers
  const handleViewUser = (user: any) => {
    viewModal.openModal(user);
    userActionToasts.userViewed(user.name);
  };

  const handleDeleteUser = (user: any) => {
    deleteModal.openModal(user);
  };

  const handleEditUser = (user: any) => {
    editModal.openModal(user);
  };

  const handleConfirmDelete = (userId: string) => {
    // Add delete logic here
    console.log("Deleting user:", userId);
    const user = deleteModal.data;
    try {
      // Simulate API call
      setTimeout(() => {
        userActionToasts.userDeleted(user?.name || "Unknown");
      }, 500);
      deleteModal.closeModal();
    } catch (error) {
      userActionToasts.userDeleteFailed(user?.name || "Unknown", error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleUpdateUser = (userData: any) => {
    // Add update logic here
    console.log("Updating user:", userData);
    try {
      // Simulate API call
      setTimeout(() => {
        userActionToasts.userUpdated(userData.name);
      }, 500);
      editModal.closeModal();
    } catch (error) {
      userActionToasts.userUpdateFailed(userData.name, error instanceof Error ? error.message : "Unknown error");
    }
  };
  return (
    <div className="space-y-8 bg-white rouned-xl p-3 sm:p-6">
     <TableHeader title="User Management" section="user" />
      <GenericTable
        data={paginatedData}
        columns={recentUsersTableConfig}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        totalpage={totalPages}
        onPageChange={goToPage}
        onDelete={handleDeleteUser}
        onView={handleViewUser}
        onWrite={handleEditUser}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageRange={pageRange}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={goToPage}
        onNext={goToNext}
        onPrev={goToPrev}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      {/* Modals */}
      <ViewUserModal
        isOpen={viewModal.isOpen}
        onClose={viewModal.closeModal}
        user={viewModal.data}
      />

      <DeleteUserModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        user={deleteModal.data}
        onConfirm={handleConfirmDelete}
      />

      <EditUserModal
        isOpen={editModal.isOpen}
        onClose={editModal.closeModal}
        user={editModal.data}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default UserManagement;
