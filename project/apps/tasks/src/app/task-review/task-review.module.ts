import { TaskReviewController } from './task-review.controller';
import { TaskReviewService } from './task-review.service';
import { TaskReviewRepository } from './task-review.repository';
import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    AuthenticationModule,
    TaskModule
  ],
  controllers: [TaskReviewController],
  providers: [TaskReviewService, TaskReviewRepository],
  exports: [TaskReviewRepository]
})
export class TaskReviewModule { }
