import { Comment } from './comment.interface.js';
import { Review } from './review.interface.js';
import { Category } from './category.interface.js';
import { Tag } from './tag.interface.js';

export interface Task {
  id?: number;
  title: string;
  details: string;
  category: Category;
  price: number;
  deadline: Date;
  image?: string;
  address: string;
  tags: Tag[];
  city: string;
  comments: Comment[];
  review?: Review;

  customerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  executerId?: string;
}
