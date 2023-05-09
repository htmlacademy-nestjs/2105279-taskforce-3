import { Module } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskTagModule } from '../task-tag/task-tag.module';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { NotifyModule } from '../notify/notify.module';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    AuthenticationModule,
    TaskCategoryModule,
    TaskTagModule,
    NotifyModule,
  ],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService]
})
export class TaskModule { }
