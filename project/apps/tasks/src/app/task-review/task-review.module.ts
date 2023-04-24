import { TaskReviewController } from './task-review.controller';
import { TaskReviewService } from './task-review.service';
import { TaskReviewRepository } from './task-review.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TaskReviewController],
  providers: [TaskReviewService, TaskReviewRepository],
  exports: [TaskReviewRepository]
})
export class TaskReviewModule { }
