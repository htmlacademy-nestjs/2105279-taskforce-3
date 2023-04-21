import { Module } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskTagModule } from '../task-tag/task-tag.module';
import { TaskCategoryModule } from '../task-category/task-category.module';

@Module({
  imports: [TaskCategoryModule, TaskTagModule],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService]
})
export class TaskModule { }
