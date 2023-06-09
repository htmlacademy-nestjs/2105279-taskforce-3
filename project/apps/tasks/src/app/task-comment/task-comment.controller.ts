import { TaskCommentService } from './task-comment.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentQuery } from './query/comment.query';
import { AuthenticationService } from '../authentication/authentication.service';

@ApiTags('task-comment')
@Controller('comments')
export class TaskCommentController {
  constructor(
    private readonly taskCommentService: TaskCommentService,
    private readonly authService: AuthenticationService
  ) { }

  /* Запрос комментария по id */
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment found'
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existComment = await this.taskCommentService.get(id);
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
    const comments = await this.taskCommentService.getList(query);
    return fillObject(CommentRdo, comments);
  }

  /* Создание нового комментария */
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  @Post('/:id')
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('id') id: number, @Body() dto: CreateCommentDto, @Req() req: Request) {
    const token = await this.authService.getPayload(req.headers['authorization']);
    const newComment = await this.taskCommentService.create(id, dto, token.sub);
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
    this.taskCommentService.delete(id);
  }

  /* Редактирование комментария */
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment edited'
  })
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto, @Req() req: Request) {
    const token = await this.authService.getPayload(req.headers['authorization']);
    const updatedComment = await this.taskCommentService.update(id, dto, token.sub);
    return fillObject(CommentRdo, updatedComment);
  }
}
