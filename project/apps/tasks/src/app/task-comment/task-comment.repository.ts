import { TaskCommentEntity } from './task-comment.entity';
import { Comment } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class TaskCommentRepository implements CRUDRepository<TaskCommentEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskCommentEntity): Promise<Comment> {
    const entityData = item.toObject();
    return this.prisma.comment.create({
      data: {
        ...entityData,
      }
    });
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      }
    });
  }

  public findById(commentId: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        commentId
      }
    });
  }

  public find({ limit, task, page }: CommentQuery): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        taskId: task
      },
      take: limit,
      orderBy: [
        { createdAt: 'desc' }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(commentId: number, item: TaskCommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        commentId
      },
      data: { ...item.toObject(), commentId }
    });
  }
}
