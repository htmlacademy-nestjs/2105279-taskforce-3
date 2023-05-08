export interface User {
  _id?: string;
  name: string;
  email: string;
  city: string;
  passwordHash: string;
  role: string;
  avatar: string;
  dateBirth: Date;

  taskCount: number;
  newCount: number;
  rating: number;
  doneCount: number;
  failedCount: number;
  info: string;
  specialization: string;
  ranking: number;
  dateRegistration: Date;
}
