export interface Comment {
  _id?: string;
  taskId: string;
  userId: string;
  createDate: Date;
  text: string;
}
