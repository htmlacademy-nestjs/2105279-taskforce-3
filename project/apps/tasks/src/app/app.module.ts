import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskCategoryModule } from './task-category/task-category.module';


@Module({
  imports: [PrismaModule, TaskCategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
