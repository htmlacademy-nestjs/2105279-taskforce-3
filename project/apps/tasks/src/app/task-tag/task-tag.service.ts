import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from '@project/shared/app-types';
import { TaskTagRepository } from './task-category.repository';
import { Injectable } from '@nestjs/common';
import { TaskTagEntity } from './task-tag.entity';

@Injectable()
export class TaskTagService {
  constructor(
    private readonly taskTagRepository: TaskTagRepository
  ) { }

  async createTag(dto: CreateTagDto): Promise<Tag> {
    const categoryEntity = new TaskTagEntity(dto);
    return this.taskTagRepository.create(categoryEntity);
  }

  async deleteTag(id: number): Promise<void> {
    this.taskTagRepository.destroy(id);
  }

  async getTag(id: number): Promise<Tag> {
    return this.taskTagRepository.findById(id);
  }

  async getCategories(): Promise<Tag[]> {
    return this.taskTagRepository.find();
  }
}
