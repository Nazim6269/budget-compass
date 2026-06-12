"use client";

import { useRef } from "react";
import { useClickOutside, DeleteIcon } from "@/shared";
import { useGetNotifications, useDeleteNotification, useDeleteAllNotifications } from "@/features/notification/model/notificationHooks";

interface Props {
  open: boolean;
  onClose: () => void;
}

const NotificationDropdown = ({ open, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  const { data: notifications, isLoading } = useGetNotifications();
  const { mutate: deleteOne } = useDeleteNotification();
  const { mutate: deleteAll } = useDeleteAllNotifications();

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-semibold text-sm">Notifications</span>
        {notifications && notifications?.data?.length > 0 && (
          <button
            onClick={() => deleteAll()}
            className="text-xs text-red-500 hover:text-red-600"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-sm text-gray-400">
            Loading...
          </div>
        ) : !notifications || notifications?.data.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-sm text-gray-400">
            No notifications
          </div>
        ) : (
          notifications?.data?.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-2 px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 group"
            >
              <div className="flex-1 min-w-0">
                {n.title && (
                  <p className="text-sm font-medium truncate">{n.title}</p>
                )}
                <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
              </div>
              <button
                onClick={() => deleteOne(n.id)}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
              >
                <DeleteIcon />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
