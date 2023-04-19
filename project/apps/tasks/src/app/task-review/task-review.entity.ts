import { Entity } from '@project/util/util-types';
import { Review } from '@project/shared/app-types';

export class TaskReviewEntity implements Entity<TaskReviewEntity>, Review {
  public id: number;
  review: string;
  evaluation: number;
  taskId: number;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public fillEntity(entity: Review) {
    this.id = entity.id;
    this.review = entity.review;
    this.evaluation = entity.evaluation;
    this.taskId = entity.taskId;
  }

  public toObject(): TaskReviewEntity {
    return { ...this };
  }
}
