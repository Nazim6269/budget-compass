"use client";
import React, { useState } from "react";
import UserManagementHeader from "./UserManagementHeader";
import GenericTable from "@/shared/ui/GenericTable";
import { recentUsers } from "@/widgets/overview/ui/data";
import { recentUsersTableConfig } from "@/shared/config/tableConfig";
import { Pagination } from "@/shared/ui/Pagination";
import { usePagination } from "@/shared";

const UserManagement = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
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
  return (
    <div className="space-y-8 bg-white rouned-xl p-3 sm:p-6">
      <UserManagementHeader />
      <GenericTable
        data={paginatedData}
        columns={recentUsersTableConfig}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        totalpage={totalPages}
        onPageChange={goToPage}
        onDelete={() => {}}
        onView={() => {}}
        onWrite={() => {}}
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
    </div>
  );
};

export default UserManagement;
