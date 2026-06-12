import { IHttpClient } from "@/shared/api/http-client";
import { ReturnUserType } from "./userManagementType";

export class UserManagementRepository {
  constructor(readonly http: IHttpClient) {}

  getAllUsers<T = ReturnUserType[]>() {
    return this.http.get<T>("/admin/user");
  }
}
