"use client";

import Image from "next/image";
import React from "react";
import { ChevronDown } from "lucide-react";
import TableSkeleton from "./TableSkeleton";
import { useIsMobile } from "../model/useMobile";
import EyeOnIcon from "./icons/EyeOnIcon";
import DeleteIcon from "./icons/DeleteIcon";
import WriteIcon from "./icons/WriteIcon";

export interface ColumnConfig {
  label: React.ReactNode;
  width?: {
    mobile: string;
    desktop: string;
  };
  accessor: string;
  formatter?: (value: any, row: any, index?: number) => React.ReactNode;
}

interface DynamicTableProps {
  columns: ColumnConfig[];
  data: Record<string, any>[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onView?: (row: any) => void;
  onDelete?: (id: any) => void;
  onWrite?: (id: any) => void;
  onStatus?: (row: any) => void; // Updated type definition for onStatus
  noDataMessage?: string;
  totalpage: number;
  totalItems?: number;
  setItemsPerPage?: (n: number) => void;
  loading?: boolean;
  error?: string;
  border?: boolean;
  renderFooter?: (colSpan: number) => React.ReactNode;
  imageAccessor?: string | string[];
}

export default function GenericTable({
  columns,
  data,
  currentPage,
  itemsPerPage,
  border = true,
  onPageChange,
  loading = false,
  onView,
  totalpage,
  onDelete,
  onWrite,
  onStatus,
  noDataMessage = "No data found!",
  totalItems,
  setItemsPerPage,
  error,
  renderFooter,
  imageAccessor,
}: DynamicTableProps) {
  const hasActions = Boolean(onView || onDelete || onWrite || onStatus);
  const colSpan = columns.length + (hasActions ? 1 : 0);
  const isMobile = useIsMobile();

  const resolveWidth = (width: ColumnConfig["width"]) => {
    if (typeof width === "object") {
      return isMobile ? width.mobile : width.desktop;
    }
    return width;
  };
  return (
    <div>
      <div
        className={`rounded-t-md ${border ? "border border-primaryColor" : ""}`}
      >
        <div className="overflow-auto bg-blackColor">
          <table className="min-w-[1000px] w-full text-left bg-blackColor border border-secondaryColor">
            {/* TABLE HEADER */}
            <thead className="sticky top-0 text-headingColor bg-[#EDEBEA] rounded-t-md">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={{ width: resolveWidth(col.width) }}
                    className="px-4 bg-secondaryColor py-2 text-sm font-semibold"
                  >
                    {col.label}
                  </th>
                ))}

                {hasActions && (
                  <th className="px-4 py-2 text-sm font-semibold text-whiteColor bg-secondaryColor">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {/* LOADING STATE */}
              {loading ? (
                <TableSkeleton
                  columns={columns}
                  rows={itemsPerPage}
                  hasActions={hasActions}
                />
              ) : data?.length > 0 ? (
                /* DATA ROWS */
                data.map((row, i) => (
                  <tr key={i} className="border-t border-secondaryColor">
                    {columns.map((col, idx) => {
                      const value = row[col.accessor];
                      const index = (currentPage - 1) * itemsPerPage + i;

                      return (
                        <td
                          key={idx}
                          style={{ width: resolveWidth(col.width) }}
                          className="px-4 py-3 text-sm text-grayBlack"
                        >
                          {col.formatter
                            ? col.formatter(value, row, index)
                            : (() => {
                                const imageSources = imageAccessor
                                  ? Array.isArray(imageAccessor)
                                    ? imageAccessor
                                    : [imageAccessor]
                                  : ["img"];

                                const rawImgUrl = imageSources.reduce<
                                  string | undefined
                                >(
                                  (found, key) =>
                                    found ?? (row[key] ? row[key] : undefined),
                                  undefined,
                                );

                                return value;
                              })()}
                        </td>
                      );
                    })}

                    {/* ACTIONS */}
                    {hasActions && (
                      <td className="px-4 py-3 w-[100px]">
                        <div className="flex gap-4 items-center">
                          {onView && (
                            <span
                              className="cursor-pointer bg-[#F8FAFB] p-1.5 rounded-md"
                              onClick={() => onView(row)}
                            >
                              <EyeOnIcon />
                            </span>
                          )}

                          {onWrite && (
                            <span
                              className="cursor-pointer bg-[#F8FAFB] p-1.5 rounded-md"
                              onClick={() => onWrite(row.id)}
                            >
                              <WriteIcon />
                            </span>
                          )}

                          {onDelete && (
                            <span
                              className="cursor-pointer bg-[#F8FAFB] p-1.5 rounded-md"
                              onClick={() => onDelete(row.id)}
                            >
                              <DeleteIcon />
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                /* EMPTY STATE */
                <tr>
                  <td
                    colSpan={colSpan}
                    className="px-4 py-10 text-center text-sm"
                  >
                    {error ? (
                      <p className="text-red-500 text-xl capitalize font-semibold">
                        {error} — please login again
                      </p>
                    ) : (
                      <p className="text-xl text-gray-500 capitalize font-semibold">
                        {noDataMessage}
                      </p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>

            {/* FOOTER */}
            {renderFooter && <tfoot>{renderFooter(colSpan)}</tfoot>}
          </table>
        </div>
      </div>
    </div>
  );
}
