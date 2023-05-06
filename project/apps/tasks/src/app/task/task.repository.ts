import { TaskEntity } from './task.entity';
import { Task } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskQuery } from './query/task.query';
import { Update } from '@prisma/client';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    const newTask = await this.prisma.task.create({
      data: {
        ...entityData,
        tags: {
          connect: entityData.tags.map(({ tagId }) => ({ tagId }))
        },
        comments: {
          connect: []
        },
      },
      include: {
        tags: true,
        comments: true,
        category: true
      }
    });
    await this.prisma.update.create({ data: { taskId: newTask.taskId } });
    return newTask;
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      }
    });
  }

  public async findById(taskId: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId
      },
      include: {
        tags: true,
        comments: true,
        category: true,
        Review: true
      }
    });
  }

  public async find({ limit, category, sortDirection, page }: TaskQuery): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        categoryId: category
      },
      take: limit,
      include: {
        tags: true,
        comments: true,
        category: true,
        Review: true
      },
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findUpdate(): Promise<Update[]> {
    const updateTasks = await this.prisma.update.findMany({
      where: {},
      select: {
        taskId: true
      }
    });
    updateTasks.map(async (task) => await this.prisma.update.delete({ where: { taskId: task.taskId } }));
    return updateTasks;
  }

  public async update(id: number, item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    const newTask = await this.prisma.task.update({
      where: {
        taskId: id
      },
      data: {
        ...entityData,
        tags: {
          connect: entityData.tags.map(({ tagId }) => ({ tagId }))
        },
        comments: {
          connect: []
        },
      },
      include: {
        tags: true,
        comments: true,
        category: true
      }
    });
    await this.prisma.update.upsert({
      where: {
        taskId: id
      },
      update: {},
      create: { taskId: newTask.taskId }
    });
    return newTask;
  }
}
