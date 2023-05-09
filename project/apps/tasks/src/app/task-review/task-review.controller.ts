import { TaskReviewService } from './task-review.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewRdo } from './rdo/review.rdo';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@ApiTags('review')
@Controller('reviews')
export class TaskReviewController {
  constructor(
    private readonly taskReviewService: TaskReviewService,
    private readonly authService: AuthenticationService
  ) { }

  /* Запрос отзыва по id */
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'Review found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existReview = await this.taskReviewService.get(id);
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
    const categories = await this.taskReviewService.getList();
    return fillObject(ReviewRdo, categories);
  }

  /* Создание нового отзыва */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new review has been successfully created.'
  })
  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('id') id: number, @Body() dto: CreateReviewDto, @Req() req: Request) {
    const token = await this.authService.getPayload(req.headers['authorization']);
    const newReview = await this.taskReviewService.create(id, dto, token.sub);
    return fillObject(ReviewRdo, newReview);
  }

  /* Удаление отзыва */
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Review deleted'
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number, @Req() req: Request) {
    const token = await this.authService.getPayload(req.headers['authorization']);
    this.taskReviewService.delete(id, token.sub);
  }

  /* Редактирование отзыва */
  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'Review edited'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateReviewDto, @Req() req: Request) {
    const token = await this.authService.getPayload(req.headers['authorization']);
    const updatedReview = await this.taskReviewService.update(id, dto, token.sub)
    return fillObject(ReviewRdo, updatedReview);
  }
}
