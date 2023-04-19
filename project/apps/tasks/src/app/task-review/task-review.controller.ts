import { TaskReviewService } from './task-review.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class TaskReviewController {
  constructor(
    private readonly taskReviewService: TaskReviewService,
    // private readonly taskReviewService: TaskReviewService
  ) { }

  @Get('/:id')
  async show(@Param('id') id: string) {
    const reviewId = parseInt(id, 10);
    const existReview = await this.taskReviewService.getReview(reviewId);
    return fillObject(ReviewRdo, existReview);
  }

  @Get('/')
  async index() {
    const categories = await this.taskReviewService.getCategories();
    return fillObject(ReviewRdo, categories);
  }

  @Post('/')
  async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.taskReviewService.createReview(dto);
    return fillObject(ReviewRdo, newReview);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const reviewId = parseInt(id, 10);
    this.taskReviewService.deleteReview(reviewId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    const reviewId = parseInt(id, 10);
    const updatedReview = await this.taskReviewService.updateReview(reviewId, dto)
    return fillObject(ReviewRdo, updatedReview);
  }
}
