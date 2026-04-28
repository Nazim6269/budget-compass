import React, { useState } from "react";
import TableHeader from "@/shared/ui/TableHeader";
import { Pagination } from "@/shared/ui/Pagination";
import GenericTable from "@/shared/ui/GenericTable";
import { recentUsersTableConfig } from "@/shared/config/tableConfig";
import { subscriptionTableConfig } from "../config/subscriptionTableConfig";
import { usePagination } from "@/shared";
import { subscriptionData } from "../config/subscriptionData";

const BillingHistoryPanel = () => {
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
      data: subscriptionData,
      itemsPerPage: itemsPerPage,
      siblingCount: 1,
      resetDeps: [subscriptionData, itemsPerPage], 
    });
  return (
    <div className="bg-white p-3 sm:p-6 rounded-xl space-y-8">
      <TableHeader title="Transaction Logs" />
      <GenericTable
              data={paginatedData}
              columns={subscriptionTableConfig}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              totalpage={totalPages}
              onPageChange={goToPage}
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

export default BillingHistoryPanel;