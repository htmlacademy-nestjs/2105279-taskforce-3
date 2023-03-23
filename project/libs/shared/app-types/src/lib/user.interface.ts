import { UserRole } from './user-role.enum';

export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  town: string;
  passwordHash: string;
  role: UserRole;
  avatar: string;
  dateBirth: Date;
}
