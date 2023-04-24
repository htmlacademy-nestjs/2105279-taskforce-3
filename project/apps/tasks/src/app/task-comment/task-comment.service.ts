import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '@project/shared/app-types';
import { TaskCommentRepository } from './task-comment.repository';
import { Injectable } from '@nestjs/common';
import { TaskCommentEntity } from './task-comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class TaskCommentService {
  constructor(
    private readonly taskCommentRepository: TaskCommentRepository
  ) { }

  async createComment(taskId: number, dto: CreateCommentDto): Promise<Comment> {
    const categoryEntity = new TaskCommentEntity({
      ...dto,
      taskId,
      userId: '123'
    });
    return this.taskCommentRepository.create(categoryEntity);
  }

  async deleteComment(id: number): Promise<void> {
    this.taskCommentRepository.destroy(id);
  }

  async getComment(id: number): Promise<Comment> {
    return this.taskCommentRepository.findById(id);
  }

  async getComments(taskId: number): Promise<Comment[]> {
    return this.taskCommentRepository.find(taskId);
  }

  async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.taskCommentRepository.findById(id);
    return this.taskCommentRepository.update(id, new TaskCommentEntity({
      ...dto,
      taskId: comment.taskId,
    }
    ));
  }
}
