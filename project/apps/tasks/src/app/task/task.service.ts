import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskCategoryRepository } from '../task-category/task-category.repository';
import { TaskTagRepository } from '../task-tag/task-tag.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from '@project/shared/app-types';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TaskTagEntity } from '../task-tag/task-tag.entity';
import { TaskQuery } from './query/task.query';
import { Update } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository,
    private readonly taskTagRepository: TaskTagRepository
  ) { }

  async create(dto: CreateTaskDto, customerId: string): Promise<Task> {
    const tags = await this.parseTags(dto.tags);
    const taskEntity = new TaskEntity({ ...dto, status: TaskStatus.New, comments: [], tags, customerId });
    return this.taskRepository.create(taskEntity);
  }

  async delete(id: number, customerId: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (task?.customerId === customerId) {
      this.taskRepository.destroy(id);
    }
  }

  async get(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async getList(query: TaskQuery): Promise<Task[]> {
    return this.taskRepository.find(query);
  }

  async getUpdate(): Promise<Update[]> {
    return this.taskRepository.findUpdate();
  }

  async update(id: number, dto: UpdateTaskDto, customerId: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (task.customerId === customerId) {
      const tags = await this.parseTags(dto.tags);
      return this.taskRepository.update(id, new TaskEntity({ ...task, ...dto, tags }));
    }
  }

  private async parseTags(tags: string) {
    return tags
      ? await Promise.all(tags
        .split(' ')
        .map(async (name) => {
          const tag = await this.taskTagRepository.findByName(name);
          if (tag) {
            return tag;
          }
          return await this.taskTagRepository.create(new TaskTagEntity({ name }));
        }))
      : [];
  }
}
