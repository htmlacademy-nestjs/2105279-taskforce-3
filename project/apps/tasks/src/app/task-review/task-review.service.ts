import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@project/shared/app-types';
import { TaskReviewRepository } from './task-review.repository';
import { Injectable } from '@nestjs/common';
import { TaskReviewEntity } from './task-review.entity';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class TaskReviewService {
  constructor(
    private readonly taskReviewRepository: TaskReviewRepository
  ) { }

  async createReview(dto: CreateReviewDto): Promise<Review> {
    const reviewEntity = new TaskReviewEntity(dto);
    return this.taskReviewRepository.create(reviewEntity);
  }

  async deleteReview(id: number): Promise<void> {
    this.taskReviewRepository.destroy(id);
  }

  async getReview(id: number): Promise<Review> {
    return this.taskReviewRepository.findById(id);
  }

  async getReviews(): Promise<Review[]> {
    return this.taskReviewRepository.find();
  }

  async updateReview(id: number, dto: UpdateReviewDto): Promise<Review> {
    return this.taskReviewRepository.update(id, new TaskReviewEntity(dto));
  }
}
