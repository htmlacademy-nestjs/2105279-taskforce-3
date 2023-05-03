import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { TaskCategoryRepository } from '../task-category/task-category.repository';
import { TaskTagRepository } from '../task-tag/task-category.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from '@project/shared/app-types';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './task.entity';
import { TaskTagEntity } from '../task-tag/task-tag.entity';
import { TaskQuery } from './query/task.query';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskCategoryRepository: TaskCategoryRepository,
    private readonly taskTagRepository: TaskTagRepository
  ) { }

  async create(dto: CreateTaskDto): Promise<Task> {
    const tags = dto.tags
      ? await Promise.all(dto.tags
        .split(' ')
        .map(async (name) => {
          const tag = await this.taskTagRepository.findByName(name);
          if (tag) {
            return tag;
          }
          return await this.taskTagRepository.create(new TaskTagEntity({ name }));
        }))
      : [];

    const taskEntity = new TaskEntity({ ...dto, status: TaskStatus.New, comments: [], tags, customerId: '22' });
    return this.taskRepository.create(taskEntity);
  }

  async delete(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async get(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async getList(query: TaskQuery): Promise<Task[]> {
    return this.taskRepository.find(query);
  }

  async update(_id: number, _dto: UpdateTaskDto): Promise<Task> {
    throw new Error('Not implemented…');
  }
}
