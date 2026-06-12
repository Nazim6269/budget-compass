import { UserManagementRepository } from "./userManagementRepository";

export class UserManagementService {
  constructor(private readonly repo: UserManagementRepository) { }

  async getAllUsers() {
    const response = await this.repo.getAllUsers();
    console.log(response)
    return response;
  }
}
