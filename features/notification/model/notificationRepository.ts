import { IHttpClient } from "@/shared/api/http-client";
import { NotificationsResponseDto } from "./notificationType";

export class NotificationRepository {
  constructor(private readonly http: IHttpClient) { }

  getAll<T = NotificationsResponseDto>() {
    return this.http.get<T>("/admin/notification");
  }

  deleteAll<T = unknown>() {
    return this.http.delete<T>("/admin/notification");
  }

  deleteOne<T = unknown>(id: number) {
    return this.http.delete<T>(`/admin/notification/${id}`);
  }
}
