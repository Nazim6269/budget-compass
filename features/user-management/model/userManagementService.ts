import { UserManagementRepository } from "./userManagementRepository";
import { ReturnUserType } from "./userManagementType";

export class UserManagementService {
  constructor(private readonly repo: UserManagementRepository) { }

  async getAllUsers(): Promise<ReturnUserType[]> {
    const { data } = await this.repo.getAllUsers<{ data: ReturnUserType[] }>();
    return data.data;
  }
}
