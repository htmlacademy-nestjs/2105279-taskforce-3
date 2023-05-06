import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '@project/shared/app-types';
import { TaskCommentRepository } from './task-comment.repository';
import { Injectable } from '@nestjs/common';
import { TaskCommentEntity } from './task-comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentQuery } from './query/comment.query';

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository
  ) { }

  async create(taskId: number, dto: CreateCommentDto): Promise<Comment> {
    const categoryEntity = new TaskCommentEntity({
      ...dto,
      taskId,
      userId: '123'
    });
    return this.taskCommentRepository.create(categoryEntity);
  }

  async delete(id: number): Promise<void> {
    this.taskCommentRepository.destroy(id);
  }

  async get(id: number): Promise<Comment> {
    return this.taskCommentRepository.findById(id);
  }

  async getList(query: CommentQuery): Promise<Comment[]> {
    return this.taskCommentRepository.find(query);
  }

  async update(id: number, dto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.taskCommentRepository.findById(id);
    return this.taskCommentRepository.update(id, new TaskCommentEntity({
      ...dto,
      taskId: comment.taskId,
    }
    ));
  }
}
