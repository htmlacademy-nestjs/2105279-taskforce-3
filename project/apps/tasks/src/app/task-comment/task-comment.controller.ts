import { TaskCommentService } from './task-comment.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentQuery } from './query/comment.query';

@ApiTags('task-comment')
@Controller('comments')
export class TaskCommentController {
  constructor(
    private readonly taskCommentService: TaskCommentService
  ) { }

  /* Запрос комментария по id */
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existComment = await this.taskCommentService.getComment(id);
    return fillObject(CommentRdo, existComment);
  }

  /* Запрос списка комментариев */
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment found'
  })
  @Get('/')
  async index(@Query() query: CommentQuery) {
    const comments = await this.taskCommentService.getComments(query);
    return fillObject(CommentRdo, comments);
  }

  /* Создание нового комментария */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  @Post('/:id')
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('id') id: number, @Body() dto: CreateCommentDto) {
    const newComment = await this.taskCommentService.createComment(id, dto);
    return fillObject(CommentRdo, newComment);
  }

  /* Удаление комментария */
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment deleted'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskCommentService.deleteComment(id);
  }

  /* Редактирование комментария */
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment edited'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    const updatedComment = await this.taskCommentService.updateComment(id, { ...dto, userId: '18' });
    return fillObject(CommentRdo, updatedComment);
  }
}
