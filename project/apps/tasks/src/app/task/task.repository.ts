import { TaskEntity } from './task.entity';
import { Task } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TaskEntity): Promise<Task> {
    const entityData = item.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
        category: {
          connect: {
            categoryId: entityData.id
          }
        },
        tags: {
          connect: entityData.tags.map(({ id }) => ({ tagId: id }))
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
        category: true
      }
    });
  }

  public async find(): Promise<Task[]> {
    return this.prisma.task.findMany({
      include: {
        tags: true,
        comments: true,
        category: true
      }
    });
  }

  public update(_id: number, _item: TaskEntity): Promise<Task> {
    return Promise.resolve(undefined);
  }
}
