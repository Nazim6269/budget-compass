import React from "react";
import { Skeleton } from "./Sleleton";

import { useIsMobile } from "../model/useMobile";
import { ColumnConfig } from "./GenericTable";

interface TableSkeletonProps {
    columns: ColumnConfig[];
    rows?: number;
    hasActions?: boolean;
}

const TableSkeleton = ({ columns, rows = 5, hasActions = false }: TableSkeletonProps) => {
    const isMobile = useIsMobile();

    const resolveWidth = (width: ColumnConfig["width"]) => {
        if (typeof width === "object") {
            return isMobile ? width.mobile : width.desktop;
        }
        return width;
    };

    return (
        <>
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <tr
                    key={rowIdx}
                    className="border-t border-secondaryColor"
                    aria-hidden="true"
                >
                    {columns.map((col, colIdx) => (
                        <td
                            key={colIdx}
                            style={{ width: resolveWidth(col.width) }}
                            className="px-4 py-3"
                        >
                            <ColumnSkeleton colIdx={colIdx} />
                        </td>
                    ))}

                    {hasActions && (
                        <td className="px-4 py-3">
                            <div className="flex gap-4 items-center">
                                <Skeleton className="w-7 h-7 rounded-md shrink-0 bg-secondaryColor" />
                                <Skeleton className="w-7 h-7 rounded-md shrink-0 bg-secondaryColor" />
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </>
    );
};

const ColumnSkeleton = ({ colIdx }: { colIdx: number }) => {
    if (colIdx === 0) {
        return (
            <div className="flex items-center gap-2">
                <Skeleton className="w-8 h-8 rounded-full shrink-0 bg-secondaryColor" />
                <Skeleton className="h-4 w-28 rounded-md bg-secondaryColor" />
            </div>
        );
    }

    if (colIdx === 1) {
        return <Skeleton className="h-4 w-40 rounded-md bg-secondaryColor" />;
    }
    if (colIdx === 2) {
        return <Skeleton className="h-6 w-20 rounded-full bg-secondaryColor" />;
    }

    if (colIdx === 3) {
        return <Skeleton className="h-4 w-24 rounded-md bg-secondaryColor" />;
    }
    return <Skeleton className="h-4 w-16 rounded-md bg-secondaryColor" />;
};

export default TableSkeleton;