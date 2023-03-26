import { TaskStatus } from './task-status.enum.js';

export interface Task {
  _id?: string;
  title: string;
  details: string;
  category: string;
  price: number;
  deadline: Date;
  image: string;
  address: string;
  tagIds: string[];
  city: string;

  authorId: string;
  createData: Date;
  status: TaskStatus;
  executerId: string;
}
