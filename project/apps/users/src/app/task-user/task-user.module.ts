import { Module } from '@nestjs/common';
import { TaskUserMemoryRepository } from './task-user-memory.repository';
import { TaskUserController } from './task-user.controller';
import { TaskUserService } from './task-user.service';

@Module({
  providers: [TaskUserMemoryRepository, TaskUserService],
  exports: [TaskUserMemoryRepository],
  controllers: [TaskUserController],
})
export class TaskUserModule { }
