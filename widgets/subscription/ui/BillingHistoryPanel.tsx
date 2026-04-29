import React, { useState } from "react";
import TableHeader from "@/shared/ui/TableHeader";
import { Pagination } from "@/shared/ui/Pagination";
import GenericTable from "@/shared/ui/GenericTable";
import { subscriptionTableConfig } from "../config/subscriptionTableConfig";
import { usePagination } from "@/shared";
import { subscriptionData } from "../config/subscriptionData";
import { FilterProvider, useFilterContext, buildClientPredicate } from "@/features/filters2";
import { USER_MANAGEMENT_FILTER_CONFIGS } from "@/features/filters2/config/filterConfig";

const BillingHistoryContent = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { filters } = useFilterContext();

    const filteredData = React.useMemo(() => {
      const predicate = buildClientPredicate(USER_MANAGEMENT_FILTER_CONFIGS, filters);
      return subscriptionData.filter((item) => {
        const itemForPredicate = {
          ...item,
          billingCycle: item.plan,
        };
        return predicate(itemForPredicate as any);
      });
    }, [filters]);

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
      data: filteredData,
      itemsPerPage: itemsPerPage,
      siblingCount: 1,
      resetDeps: [filteredData, itemsPerPage], 
    });
  return (
    <div className="bg-white p-3 sm:p-6 rounded-xl space-y-8">
      <TableHeader title="Transaction Logs" section="transactions" />
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

const BillingHistoryPanel = () => {
  return (
    <FilterProvider configs={USER_MANAGEMENT_FILTER_CONFIGS} syncUrl={false}>
      <BillingHistoryContent />
    </FilterProvider>
  );
};

export default BillingHistoryPanel;