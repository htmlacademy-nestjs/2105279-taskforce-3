import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@project/shared/app-types';
import { TaskCategoryRepository } from './task-category.repository';
import { Injectable } from '@nestjs/common';
import { TaskCategoryEntity } from './task-category.entity';

@Injectable()
export class TaskCategoryService {
  constructor(
    private readonly taskCategoryRepository: TaskCategoryRepository
  ) { }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const categoryEntity = new TaskCategoryEntity(dto);
    return this.taskCategoryRepository.create(categoryEntity);
  }

  async delete(id: number): Promise<void> {
    this.taskCategoryRepository.destroy(id);
  }

  async get(id: number): Promise<Category> {
    return this.taskCategoryRepository.findById(id);
  }

  async getList(): Promise<Category[]> {
    return this.taskCategoryRepository.find();
  }

  async update(id: number, dto: CreateCategoryDto): Promise<Category> {
    return this.taskCategoryRepository.update(id, new TaskCategoryEntity(dto));
  }
}
