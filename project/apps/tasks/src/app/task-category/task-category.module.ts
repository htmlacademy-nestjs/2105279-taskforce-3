import { TaskCategoryController } from './task-category.controller';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryRepository } from './task-category.repository';
import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [TaskCategoryController],
  providers: [TaskCategoryService, TaskCategoryRepository],
  exports: [TaskCategoryRepository]
})
export class TaskCategoryModule { }
