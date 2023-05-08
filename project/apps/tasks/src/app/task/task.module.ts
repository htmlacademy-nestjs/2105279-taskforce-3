import { Module } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskTagModule } from '../task-tag/task-tag.module';
import { TaskCategoryModule } from '../task-category/task-category.module';
import { NotifyModule } from '../notify/notify.module';
import { getJwtOptions } from '@project/config/config-tasks';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TaskCategoryModule,
    TaskTagModule,
    NotifyModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
  ],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService]
})
export class TaskModule { }
