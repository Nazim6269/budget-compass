export interface NotificationDto {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
  updated_at?: string;
}

export type NotificationsResponseDto = { data: NotificationDto[] };
