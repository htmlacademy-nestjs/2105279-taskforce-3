import { TaskTagRepository } from './task-category.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [TaskTagRepository],
  exports: [TaskTagRepository]
})
export class TaskTagModule { }
