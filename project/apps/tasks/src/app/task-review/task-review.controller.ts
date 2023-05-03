import { TaskReviewService } from './task-review.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('review')
@Controller('reviews')
export class TaskReviewController {
  constructor(
    private readonly taskReviewService: TaskReviewService,
  ) { }

  /* Запрос отзыва по id */
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'Review found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existReview = await this.taskReviewService.getReview(id);
    return fillObject(ReviewRdo, existReview);
  }

  /* Запрос списка отзывов */
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'Review found'
  })
  @Get('/')
  async index() {
    const categories = await this.taskReviewService.getReviews();
    return fillObject(ReviewRdo, categories);
  }

  /* Создание нового отзыва */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateReviewDto) {
    const newReview = await this.taskReviewService.createReview(dto);
    return fillObject(ReviewRdo, newReview);
  }

  /* Удаление отзыва */
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Review deleted'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskReviewService.deleteReview(id);
  }

  /* Редактирование отзыва */
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'Review edited'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateReviewDto) {
    const updatedReview = await this.taskReviewService.updateReview(id, dto)
    return fillObject(ReviewRdo, updatedReview);
  }
}
