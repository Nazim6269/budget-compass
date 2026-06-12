"use client";
import React, { useState } from "react";
import GenericTable from "@/shared/ui/GenericTable";
import { recentUsersTableConfig } from "@/shared/config/tableConfig";
import { Pagination } from "@/shared/ui/Pagination";
import { usePagination } from "@/shared";
import TableHeader from "@/shared/ui/TableHeader";
import { useModal } from "@/shared/model/useModal";
import { ViewUserModal } from "../widgets/user-management/ui/ViewUserModal";
import { DeleteUserModal } from "../widgets/user-management/ui/DeleteUserModal";
import { EditUserModal } from "../widgets/user-management/ui/EditUserModal";
import { userActionToasts } from "@/shared/utils/toast";
import {
  FilterProvider,
  useFilterContext,
  buildClientPredicate,
} from "@/features/filters2";
import { USER_MANAGEMENT_FILTER_CONFIGS } from "@/features/filters2/config/filterConfig";
import { useGetUsers } from "@/features/user-management/model/userManagementHooks";

function UserManagementTable() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { filters } = useFilterContext();
  const { data: usersList, isLoading, error } = useGetUsers();
  console.log("Fetched users data:", usersList);

  const usersData = React.useMemo(() => usersList ?? [], [usersList]);
  console.log(usersData, "users data")

  // Apply filters to the data
  const filteredUsers = React.useMemo(() => {
    const predicate = buildClientPredicate(
      USER_MANAGEMENT_FILTER_CONFIGS,
      filters,
    );
    return usersData.filter((user) => {
      const userForPredicate = {
        ...user,
        billingCycle: (user as any).plan,
      };

      return predicate(userForPredicate as any);
    });
  }, [filters, usersData]);

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
    data: filteredUsers,
    itemsPerPage: itemsPerPage,
    siblingCount: 1,
    resetDeps: [filteredUsers, itemsPerPage],
  });

  // Modal states
  const viewModal = useModal();
  const deleteModal = useModal();
  const editModal = useModal();

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
    const user = deleteModal.data;
    try {
      // Simulate API call
      setTimeout(() => {
        userActionToasts.userDeleted(user?.name || "Unknown");
      }, 500);
      deleteModal.closeModal();
    } catch (error) {
      userActionToasts.userDeleteFailed(
        user?.name || "Unknown",
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  };

  const handleUpdateUser = (userData: any) => {
    // Add update logic here
    try {
      // Simulate API call
      setTimeout(() => {
        userActionToasts.userUpdated(userData.name);
      }, 500);
      editModal.closeModal();
    } catch (error) {
      userActionToasts.userUpdateFailed(
        userData.name,
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  };

  return (
    <div className="space-y-8 bg-white rounded-xl p-3 sm:p-6">
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
        loading={isLoading}
        error={error instanceof Error ? error.message : undefined}
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
}

const UserManagement = () => {
  return (
    <FilterProvider configs={USER_MANAGEMENT_FILTER_CONFIGS} syncUrl={true}>
      <UserManagementTable />
    </FilterProvider>
  );
};

export default UserManagement;
