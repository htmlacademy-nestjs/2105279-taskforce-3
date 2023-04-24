import { TaskCommentController } from './task-comment.controller';
import { TaskCommentService } from './task-comment.service';
import { TaskCommentRepository } from './task-comment.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TaskCommentController],
  providers: [TaskCommentService, TaskCommentRepository],
  exports: [TaskCommentRepository]
})
export class TaskCommentModule { }
