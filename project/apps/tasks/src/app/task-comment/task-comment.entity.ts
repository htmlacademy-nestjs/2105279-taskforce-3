import { Entity } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';

export class TaskCommentEntity implements Entity<TaskCommentEntity>, Comment {
  public id: number;
  public message: string;
  public userId: string;
  public taskId: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment) {
    this.id = entity.id;
    this.message = entity.message;
    this.userId = entity.userId;
    this.taskId = entity.taskId;
  }

  public toObject(): TaskCommentEntity {
    return { ...this };
  }
}
