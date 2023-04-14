import { TaskStatus } from './task-status.enum.js';

export interface Task {
  id?: string;
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
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  executerId: string;
}
