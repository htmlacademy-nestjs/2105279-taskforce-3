import { Tag } from './tag.interface.js';
import { City } from './city.enum.js';
import { Comment } from './comment.interface.js';
import { Review } from './review.interface.js';
import { Category } from './category.interface.js';
import { TaskStatus } from './task-status.enum.js';

export interface Task {
  id?: number;
  title: string;
  details: string;
  category: Category;
  price: number;
  deadline: Date;
  image: string;
  address: string;
  tags: Tag[];
  city: City;
  comments: Comment[];
  review: Review;

  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  executerId: string;
}
