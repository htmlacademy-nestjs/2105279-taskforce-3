import { TaskCommentService } from './task-comment.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class TaskCommentController {
  constructor(
    private readonly taskCommentService: TaskCommentService
  ) { }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const existComment = await this.taskCommentService.getComment(id);
    return fillObject(CommentRdo, existComment);
  }

  @Get('/task/:id')
  async index(@Param('id') id: number) {
    const comment = await this.taskCommentService.getComments(id);
    return fillObject(CommentRdo, comment);
  }

  @Post('/task/:id')
  async create(@Param('id') id: number, @Body() dto: CreateCommentDto) {
    const newComment = await this.taskCommentService.createComment(id, dto);
    return fillObject(CommentRdo, newComment);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskCommentService.deleteComment(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    const updatedComment = await this.taskCommentService.updateComment(id, { ...dto, userId: '18' });
    return fillObject(CommentRdo, updatedComment);
  }
}
