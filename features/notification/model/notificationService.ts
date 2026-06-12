import { parseError } from "@/shared/api/api-errors";
import { logger } from "@/shared/api/logger";
import { NotificationRepository } from "./notificationRepository";
import { NotificationsResponseDto } from "./notificationType";

export class NotificationService {
  constructor(private readonly repo: NotificationRepository) {}

  async getAll(): Promise<NotificationsResponseDto> {
    try {
      const { data } = await this.repo.getAll();
      return data;
    } catch (error) {
      logger.error(String(error), "Error fetching notifications");
      throw parseError(error);
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await this.repo.deleteAll();
    } catch (error) {
      logger.error(String(error), "Error deleting all notifications");
      throw parseError(error);
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      await this.repo.deleteOne(id);
    } catch (error) {
      logger.error(String(error), `Error deleting notification ${id}`);
      throw parseError(error);
    }
  }
}
