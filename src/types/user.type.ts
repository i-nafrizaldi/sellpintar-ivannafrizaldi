export interface User {
  id: string;
  username: string;
  role: Role;
}

export enum Role {
  user = "User",
  admin = "Admin",
}
