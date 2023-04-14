export interface Comment {
  id?: string;
  message: string;
  taskId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
