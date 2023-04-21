import { Expose } from 'class-transformer';
import { Category, Review } from '@prisma/client';

export class TaskRdo {

  @Expose({ name: 'taskId' })
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public details: string;

  @Expose()
  public category: Category;

  @Expose()
  public price: number;

  @Expose()
  public deadline: Date;

  @Expose()
  public image: string;

  @Expose()
  public address: string;

  @Expose()
  public tags: string;

  @Expose()
  public city: string;

  @Expose()
  public comments: Comment[];

  @Expose({ name: 'Review' })
  public review: Review;

  @Expose()
  public customerId: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public status: string;

  @Expose()
  public executerId: string;
}
