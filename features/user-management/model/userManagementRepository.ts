import { IHttpClient } from "@/shared/api/http-client";
import { ReturnUserType } from "./userManagementType";

export class UserManagementRepository {
  constructor(readonly http: IHttpClient) {}

  getAllUsers() {
    return this.http.get<ReturnUserType[]>("/admin/user");
  }
}
