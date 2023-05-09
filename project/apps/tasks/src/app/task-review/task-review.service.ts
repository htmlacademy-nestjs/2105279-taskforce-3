import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@project/shared/app-types';
import { TaskReviewRepository } from './task-review.repository';
import { Injectable } from '@nestjs/common';
import { TaskReviewEntity } from './task-review.entity';
import { UpdateReviewDto } from './dto/update-review.dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class TaskReviewService {
  constructor(
    private readonly taskReviewRepository: TaskReviewRepository,
    private readonly taskService: TaskService,
  ) { }

  async create(taskId: number, dto: CreateReviewDto, customerId: string): Promise<Review> {
    const review = await this.taskReviewRepository.findById(taskId);
    const task = await this.taskService.get(taskId);
    if (!review && task?.customerId === customerId) {
      const reviewEntity = new TaskReviewEntity({ ...dto, taskId });
      return this.taskReviewRepository.create(reviewEntity);
    }
  }

  async delete(taskId: number, customerId: string): Promise<void> {
    const review = await this.taskReviewRepository.findById(taskId);
    const task = await this.taskService.get(taskId);
    if (review && task?.customerId === customerId) {
      this.taskReviewRepository.destroy(taskId);
    }
  }

  async get(taskId: number): Promise<Review> {
    return this.taskReviewRepository.findById(taskId);
  }

  async getList(): Promise<Review[]> {
    return this.taskReviewRepository.find();
  }

  async update(taskId: number, dto: UpdateReviewDto, customerId: string): Promise<Review> {
    const review = await this.taskReviewRepository.findById(taskId);
    const task = await this.taskService.get(taskId);
    if (review && task.customerId === customerId) {
      return this.taskReviewRepository.update(taskId, new TaskReviewEntity({ ...dto, taskId }));
    }
  }
}
